import { IconChecked } from "public/icons/Checked"
import { ButtonContainer } from "../button"
import { Loading } from "../loading/Loading"
import { currency } from "src/app/utils/currency"
import { Input } from "../form/FormComponents"
import { useMemo, useState, useRef, useEffect } from "react"
import { IconX } from "public/icons/X"
import { FakeButton } from "src/app/utils/FakeButton"
import { IconMoney } from "public/icons/Money"
import { Container } from "../layout/Container"
import { Header } from "../layout/Header"
import { CenterTop } from "../modal/ModalTop"
import { Content } from "../layout/Content"
import { Footer } from "../layout/Footer"
import { Tabs } from "../Tabs"

const paymentMethods = [
  { name: 'Cartão', id: 'CARD' },
  { name: 'Dinheiro', id: 'CASH' },
  { name: 'Pix', id: 'PIX' },
  { name: 'Outro', id: 'OTHER' }
]


const arrTabs = [
  { title: 'Pagamento Simples', id: 'simples' },
  { title: 'Pagamento Fragmentado', id: 'fragmentado' },
]

const ComponentFeedback = ({ isLoadingCloseCommand }) => (
  <div className="p-4 pt-8 flex flex-col items-center text-center">
    {!isLoadingCloseCommand ? (
      <>
        <div className="flex justify-center mb-8 items-center h-14 w-14 text-[var(--button-default)] rounded-2xl bg-[var(--button-disabled)]/50 ">
          <IconChecked size="h-[40px] w-[40px]" />
        </div>
        <span className="text-2xl font-extrabold  mb-2">
          Comanda finalizada
        </span>
        <span className="text-sm  mb-2">
          Você será redirecionar para o inicio
        </span>

        <div className="flex flex-col sm:flex-row w-full gap-3 mt-6">
          <ButtonContainer
            hFull="h-12"
            href="/home"
            text="Ir"
          />
        </div>
      </>
    ) : (
      <Loading isLoading={isLoadingCloseCommand} style="style3" />
    )}
  </div>
)

export function ResumoFinanceiro({ totalComanda, payments }) {

  return (
    <div className="flex w-full pb-2 justify-between gap-3 bg-">
      <div className="relative flex flex-col w-full items-center justify-center h-8">
        <span className="top-[-8px] left-2 text-sm font-semibold rounded-sm bg-[var(--bg-component)] text-[var(--button-default)] px-1 mb-1">Receber</span>
        <span>{currency(totalComanda - payments.reduce((sum, payment) => sum + payment.value, 0))}</span>
      </div>
      <div className="relative flex flex-col w-full items-center justify-center h-8">
        <span className="top-[-8px] left-2 text-sm font-semibold rounded-sm bg-[var(--bg-component)] text-[var(--button-default)] px-1 mb-1">Recebido</span>
        <span>{currency(payments.reduce((sum, payment) => sum + payment.value, 0))}</span>
      </div>
    </div>
  );
}

export function ComponentFragmentPayment({
  payments,
  testParaIniciarDivNoFim,
  setPayments = () => { },
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
    <div className="flex flex-col items-center">
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
          icon={<div className="text-[var(--button-default)]"><IconMoney size="h-[20px] w-[20px]" /></div>}
        />
        <ButtonContainer onClick={handleUpdateValue} wFull="w-14" text="+" margin="mt-1" />
        <FakeButton />
      </form>
    </div>
  );
}

export const Checkout = ({ isFinish, setTabPayment, setOpenCenterModal, openCenterModal, setMethodID, methodID, totalComanda, postCloseCommand, isLoadingCloseCommand }) => {
  const [installment, setInstallment] = useState("1");
  const [pay, setPay] = useState(totalComanda)
  const [isSplitPayment, setIsSplitPayment] = useState(true)
  const [payments, setPayments] = useState([]);
  const refEndPage = useRef(null);
  const [tab, setTab] = useState('simples');

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

    useEffect(() => {
      handleCheckboxChange()
    }, [tab])

  return (
  <Container>
    <Header 
      divider
      close
      onClick={() => setTabPayment(false)} 
      title="Pagamento"
    />
    <Content >
      <div className="p-4 pt-0 flex gap-2 flex-col items-center justify-center ">
        <Tabs tabs={arrTabs} value={tab} setValue={setTab} />
        <div className="flex flex-col w-full items-center justify-center mb-3 mt-20">
          {isSplitPayment ? (
            <select
              disabled={isSplitPayment}
              onChange={(e) => handleSetInstallment(e)}
              value={installment}
              className=" text-center px-4 py-2 text-6xl font-medium text-[var(--button-default)] rounded-lg focus:ring-2 focus:ring-[var(--button-default)] focus:border-[var(--button-focus)] outline-none appearance-none "
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
              className=" text-center mb-16 px-2 py-2 text-6xl font-medium text-[var(--button-default)] rounded-lg focus:ring-2 focus:ring-[var(--button-default)] focus:border-[var(--button-focus)] outline-none appearance-none "
            >
              {installmentOptions.map((op, i) => (
                <option key={i} value={op._id}>
                  {op.name} × {currency(totalComanda / op._id)}
                </option>
              ))}
            </select>
          )}
        </div>
        
        {isSplitPayment && (
          <span className="flex flex-col text-md w-full mb-3">
            <ComponentFragmentPayment payments={payments} setPayments={setPayments} testParaIniciarDivNoFim={testParaIniciarDivNoFim} totalComanda={totalComanda} />
          </span>
        )}
        <div ref={refEndPage} id="endModal" className="h-0" ></div>
        <div className="grid w-full grid-cols-2 gap-4">
          {paymentMethods.map((method) => (
            <ButtonContainer
              key={method.id}
              onClick={() => setMethodID(method.id)}
              hFull="h-20"
              press={methodID === method.id}
              style='buttonInline'
            >
              <span className={`text-xs`}>{method.name}</span>
            </ButtonContainer>
          ))}
        </div>

      </div>
      <Footer>
        <ButtonContainer
            onClick={postCloseCommand}
            text="Confirmar Pagamento"
            margin="mx-2 mb-2"
            hFull="h-12"
            disabled={isSplitPayment && !(totalComanda - payments.reduce((sum, payment) => sum + payment.value, 0) <= 0)}
          />
        </Footer>
    </Content>
            {isFinish && (
          <CenterTop
            notCloseBg
            showX
            isOpen={openCenterModal}
            onClose={() => setOpenCenterModal(false)}
          >
            <ComponentFeedback isLoadingCloseCommand={isLoadingCloseCommand} />
          </CenterTop>)
        }
  </Container>

  )
}
