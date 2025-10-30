import { IconChecked } from "public/icons/Checked"
import { ButtonContainer } from "../button"
import { Loading } from "../loading/Loading"
import { currency } from "src/app/utils/currency"
import { Input } from "../form/FormComponents"
import { useMemo, useState, useRef } from "react"
import { IconX } from "public/icons/X"
import { FakeButton } from "src/app/utils/FakeButton"

const paymentMethods = [
  { name: 'Cartão', id: 'CARD' },
  { name: 'Dinheiro', id: 'CASH' },
  { name: 'Pix', id: 'PIX' },
  { name: 'Outro', id: 'OTHER' }
]

const ComponentFeedback = ({ isLoadingCloseCommand }) => (
  <div className="p-4 pt-8 flex flex-col items-center text-center">
    {!isLoadingCloseCommand ? (
      <>
        <div className="flex justify-center mb-8 items-center h-14 w-14 text-[var(--button-green-default)] rounded-2xl bg-[var(--button-green-disabled)]/50 ">
          <IconChecked size="h-[40px] w-[40px]" />
        </div>
        <span className="text-2xl font-extrabold  mb-2">
          Comanda finalizada
        </span>
        <span className="text-sm  mb-2">
          Deseja ir para lista de comandas?
        </span>

        <div className="flex flex-col sm:flex-row w-full gap-3 mt-6">
          <ButtonContainer
            href="/comandas"
            text="Sim"
            style="buttonGreen"
          />
        </div>
      </>
    ) : (
      <Loading isLoading={isLoadingCloseCommand} style="style3" />
    )}
  </div>
)


function AnimatedNumber({ value, duration = 1000, format = (v) => v.toFixed(0) }) {
  const [display, setDisplay] = useState(value);
  const startValue = useRef(value);

  useEffect(() => {
    const start = startValue.current;
    const end = value;
    const diff = end - start;

    if (diff === 0) return;

    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0 → 1

      // interpolação linear
      const current = start + diff * progress;

      setDisplay(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        startValue.current = end; // salva o novo ponto inicial
      }
    };

    requestAnimationFrame(step);
  }, [value, duration]);

  return <span>{format(display)}</span>;
}

export function ResumoFinanceiro({ totalComanda, payments }) {

  return (
    <div className="flex w-full pb-2 justify-between gap-3 bg-">
      <div className="relative flex flex-col w-full items-center justify-center h-8">
        <span className="top-[-8px] left-2 text-xs bg-[var(--bg-component)] text-[var(--button-default)] px-1">Receber</span>
        <span>{currency(totalComanda - payments.reduce((sum, payment) => sum + payment.value, 0))}</span>
      </div>
      <div className="relative flex flex-col w-full items-center justify-center h-8">
        <span className="top-[-8px] left-2 text-xs bg-[var(--bg-component)] text-[var(--button-default)] px-1">Recebido</span>
        <span>{currency(payments.reduce((sum, payment) => sum + payment.value, 0))}</span>
      </div>
    </div>
  );
}

export function ComponentFragmentPayment({
  payments,
  testParaIniciarDivNoFim,
  setPayments = () => {},
  totalComanda
}) {
  const [value, setValue] = useState(0);
  const [removingId, setRemovingId] = useState(null); // 👈 controla o fade-out

  const handleUpdateValue = (e) => {
    e?.preventDefault();
    if (value <= 0) return;
    setPayments((prevPayments) => [
      ...prevPayments,
      { id: Date.now(), value } // 👈 id único (melhor que length)
    ]);
    setValue(0);
  };

  const removerPrice = (id) => {
    setRemovingId(id);
    // espera o fade-out antes de remover
    setTimeout(() => {
      setPayments((prevPayments) =>
        prevPayments.filter((payment) => payment.id !== id)
      );
      setRemovingId(null);
    }, 250); // tempo igual ao da animação CSS
  };

  return (
    <div>
      <div className="min-h-[45px] mb-2">
        {payments.length > 0 && (
          <div className="mb-2 grid gap-2 grid-cols-2">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className={`flex items-center px-2 border border-[var(--button-default)] rounded-sm justify-between relative
                  transition-all duration-300
                  ${removingId === payment.id ? "animate-fade-out" : "animate-fade-in"}`}
              >
                <span className="absolute top-[-8px] left-2 text-xs bg-[var(--bg-component)] text-[var(--button-default)] px-1">
                  Pago
                </span>
                <p>{currency(payment.value)}</p>
                <button
                  className="flex w-10 h-10 items-center justify-end"
                  onClick={() => removerPrice(payment.id)}
                >
                  <IconX size="h-[16px] w-[16px]" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <ResumoFinanceiro totalComanda={totalComanda} payments={payments} />

      <form onSubmit={handleUpdateValue} className="flex items-center gap-2">
        <Input
          id="payment"
          setValue={setValue}
          placeholder="Preço do produto"
          type="tel"
          value={value}
          isCurrency
          onFocus={testParaIniciarDivNoFim}
        />
        <ButtonContainer onClick={handleUpdateValue} wFull="w-14" text="+" margin="mt-1" />
        <FakeButton />
      </form>
    </div>
  );
}

const ComponentPayment = ({ setMethodID, methodID, totalComanda, postCloseCommand }) => {
  const [installment, setInstallment] = useState("1");
  const [pay, setPay] = useState(totalComanda)
  const [isSplitPayment, setIsSplitPayment] = useState(false)
  const [payments, setPayments] = useState([]);
  const refEndPage = useRef(null);

  const testParaIniciarDivNoFim = () => {
    if (refEndPage.current) {
      setTimeout(() => {
        refEndPage.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const handleCheckboxChange = () => {
    setIsSplitPayment(!isSplitPayment)
    if (!isSplitPayment) {
      setPay(totalComanda)
    }
  }

  const installmentOptions = useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => {
      const numero = (index + 1).toString();
      return { name: numero, _id: numero };
    });
  }, []);

  const handleSetInstallment = (e) => {
    setPay(totalComanda / e.target.value)
    setInstallment(e.target.value)
  }

  return (
    <div className="p-4 pt-0 flex gap-2 flex-col items-center justify-center ">
      <span className="text-md font-extrabold mb-2">
        Pagamento
      </span>
      <div className="flex flex-col w-full items-center justify-center mb-3">
        {isSplitPayment ? (
          <select
            disabled={isSplitPayment}
            onChange={(e) => handleSetInstallment(e)}
            value={installment}
            className=" text-center px-4 py-2 text-4xl font-bold text-[var(--button-default)] rounded-lg focus:ring-2 focus:ring-[var(--button-default)] focus:border-[var(--button-focus)] outline-none appearance-none "
          >
            <option value="1">
              {currency(totalComanda)}
            </option>
          </select>
        ) : (
          <select
            disabled={isSplitPayment}
            onChange={(e) => handleSetInstallment(e)}
            value={installment}
            className=" text-center px-2 py-2 text-4xl font-bold text-[var(--button-default)] rounded-lg focus:ring-2 focus:ring-[var(--button-default)] focus:border-[var(--button-focus)] outline-none appearance-none "
          >
            {installmentOptions.map((op, i) => (
              <option key={i} value={op._id}>
                {op.name} × {currency(totalComanda / op._id)}
              </option>
            ))}
          </select>
        )}
      </div>
      <div ref={refEndPage} id="endModal" className="h-0" ></div>
      {isSplitPayment && (
        <span className="flex flex-col text-md justify-start w-full mb-3">
          <ComponentFragmentPayment payments={payments} setPayments={setPayments} testParaIniciarDivNoFim={testParaIniciarDivNoFim} totalComanda={totalComanda} />
        </span>
      )}

      <div className="flex w-full gap-2">
        {paymentMethods.map((method) => (
          <ButtonContainer
            key={method.id}
            onClick={() => setMethodID(method.id)}
            hFull="h-10"
            press={methodID === method.id}
            style='buttonInline'
          >
            <span className={`text-xs`}>{method.name}</span>
          </ButtonContainer>
        ))}
      </div>
      <div className={`flex items-center gap-2 pb-2 my-4`}>
        <input
          className={`
              bg-[var(--button-disabled)] 
              h-4 w-4 text-[var(--button-disabled)]
            `}
          type="checkbox"
          id="scales"
          name="scales"
          onChange={handleCheckboxChange}
          checked={isSplitPayment}
        />
        <label htmlFor="scales">Pagamento Fragmentado</label>
      </div>
      <div className="flex flex-col sm:flex-row w-full gap-3 ">
        <ButtonContainer
          onClick={postCloseCommand}
          text="Confirmar Pagamento"
          disabled={isSplitPayment && !(totalComanda - payments.reduce((sum, payment) => sum + payment.value, 0) <= 0)}
        />
      </div>
    </div>
  )
}

export const Checkout = ({ isFinish, setMethodID, methodID, totalComanda, postCloseCommand, isLoadingCloseCommand }) => {

  if (!isFinish) return (
    <ComponentPayment
      setMethodID={setMethodID}
      methodID={methodID}
      totalComanda={totalComanda}
      postCloseCommand={postCloseCommand}
    />
  )

  return <ComponentFeedback isLoadingCloseCommand={isLoadingCloseCommand} />

}