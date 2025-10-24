import { IconChecked } from "public/icons/Checked"
import { ButtonContainer } from "../button"
import { Loading } from "../loading/Loading"
import { currency } from "src/app/utils/currency"
import { Input } from "../form/FormComponents"
import { useMemo, useState, useRef } from "react"

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

const CreateInput = ({ id, price, testParaIniciarDivNoFim, onPriceChange = () => { } }) => {
  const handleSetPrice = (value) => onPriceChange(id, value)

  return (
    <Input
      id={`price-${id}`}
      setValue={handleSetPrice}
      placeholder="Preço do produto"
      value={price}
      type="tel"
      isCurrency
      autoFocus
      onFocus={testParaIniciarDivNoFim}
    />
  );
};

const ComponentInputs = ({ payments, testParaIniciarDivNoFim, setPayments = () => { } }) => {
  const handleAddInput = () => {
    const nextId = payments.length + 1;
    setPayments(prevPayments => [
      ...prevPayments,
      { id: nextId, value: "" }
    ]);
  };

  const handleUpdatePrice = (id, newValue) => {
    setPayments(prevPayments =>
      prevPayments.map(payment =>
        payment.id === id ? { ...payment, value: newValue } : payment
      )
    );
  };

  return (
    <div className="max-h-[160px] overflow-y-auto">
      {payments.map((payment) => (
        <div
          key={payment.id}
          className="flex items-center gap-2 mb-1 py-2"
        >
          <div className="w-7">{payment.id}º</div>
          <CreateInput
            id={payment.id}
            price={payment.value}
            onPriceChange={handleUpdatePrice}
            testParaIniciarDivNoFim={testParaIniciarDivNoFim}
          />
          <ButtonContainer
            onClick={handleAddInput}
            wFull="w-9"
            hFull="h-8"
            text="+"
            margin="mt-1"
          />
        </div>
      ))}

    </div>
  );
};

const ComponentPayment = ({ setMethodID, methodID, totalComanda, postCloseCommand }) => {
  const [installment, setInstallment] = useState("1");
  const [pay, setPay] = useState(totalComanda)
  const [isSplitPayment, setIsSplitPayment] = useState(false)
  const [payments, setPayments] = useState([{ id: 1, value: 0 }]);
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
      setInstallment("1")
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

  const totalPayments = useMemo(() => {
    return payments.reduce((sum, payment) => sum + payment.value, 0);
  }, [payments]);

  return (
    <div className="p-4 pt-0 flex gap-6 flex-col items-center justify-center ">
      <span className="text-md font-extrabold mb-2">
        Pagamento
      </span>
      <div className="flex flex-col w-full items-center justify-center">
        <select
          disabled={isSplitPayment}
          onChange={(e) => handleSetInstallment(e)}
          value={installment}
          className=" text-center px-2 py-2 text-4xl font-bold text-[var(--button-default)]  rounded-lg focus:ring-2 focus:ring-[var(--button-default)] focus:border-[var(--button-focus)] outline-none appearance-none "
        >
          {installmentOptions.map((op, i) => (
            <option key={i} value={op._id}>
              {op.name} × {isSplitPayment ? currency(pay - totalPayments) : currency(totalComanda / op._id)}
            </option>
          ))}
        </select>
      </div>
      <div ref={refEndPage} id="endModal" className="h-0" ></div>
      {isSplitPayment && (
        <span className="flex flex-col text-md justify-start w-full">
          <ComponentInputs payments={payments} setPayments={setPayments} testParaIniciarDivNoFim={testParaIniciarDivNoFim} />
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
        <div className={`flex items-center gap-2 pb-2`}>
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