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
import { KeyNumber } from "../KeyBoard/KeyNumber"

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
    <div className="flex w-full pb-2 justify-between gap-3 mb-1">
      <div className="relative flex flex w-full py-2 px-4 h-10 content-center bg-[var(--bg-component)] justify-between rounded-md shadow-lg shadow-[var(--bg-subTitle)]/50">
        <span className="top-[-8px] left-2 text-sm font-semibold rounded-sm text-[var(--button-default)]">Receber</span>
        <span>{currency(totalComanda - payments.reduce((sum, payment) => sum + payment.value, 0))}</span>
      </div>
      <div className="relative flex w-full py-2 px-4 h-10 content-center bg-[var(--bg-component)] justify-between rounded-md shadow-lg shadow-[var(--bg-subTitle)]/50">
        <span className="top-[-8px] left-2 text-sm font-semibold rounded-sm  text-[var(--button-default)]">Recebido</span>
        <span>{currency(payments.reduce((sum, payment) => sum + payment.value, 0))}</span>
      </div>
    </div>
  );
}

export function ComponentFragmentPayment({
  showValue,
  setShowValue,
  paymentMethods,
  payments,
  setPayments = () => { },
  totalComanda,
  setMethodID,
  methodID
}) {
  const [removingId, setRemovingId] = useState(null); // 👈 controla o fade-out

  const handleUpdateValue = (e) => {
    e?.preventDefault();
    if (showValue <= 0) return;
    setPayments((prevPayments) => [
      ...prevPayments,
      { id: Date.now(), value: showValue }
    ]);
    setShowValue(0)
  };

  const removerPrice = (id) => {
    setRemovingId(id);
    setTimeout(() => {
      setPayments((prevPayments) =>
        prevPayments.filter((payment) => payment.id !== id)
      );
      setRemovingId(null);
    }, 250);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="min-h-[50px] mb-2">
        {(payments.length > 0) && (
          <div className="mb-2 grid gap-1 grid-cols-3">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className={`flex items-center px-2 border border-[var(--button-default)] rounded-sm justify-between relative
                  transition-all duration-300
                  ${removingId === payment.id ? "animate-fade-out" : "animate-fade-in"}`}
              >
                <span className="absolute top-[-8px] left-2 text-xs bg-[var(--foreground)] text-[var(--button-default)] px-1">
                  Pago
                </span>
                <p>{currency(payment.value)}</p>
                <button
                  className="flex w-6 h-10 items-center justify-end"
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
      
        <div className="relative flex w-full mb-4 py-2 px-4 h-10 content-center bg-[var(--bg-component)] justify-between rounded-md shadow-lg shadow-[var(--bg-subTitle)]/50">
        <span className="top-[-8px] left-2 text-sm font-semibold rounded-sm  text-[var(--button-default)]">Valor Total</span>
        <span>{currency(totalComanda)}</span>
      </div>
      <div className="grid w-full grid-cols-4 gap-4">
        {paymentMethods.map((method) => (
          <ButtonContainer
            key={method.id}
            onClick={() => setMethodID(method.id)}
            hFull="h-12"
            press={methodID === method.id}
            style='buttonInline'
          >
            <span className={`text-xs`}>{method.name}</span>
          </ButtonContainer>
        ))}
      </div>
      <KeyNumber setValue={setShowValue} showValue={showValue} send={handleUpdateValue} />
    </div>
  );
}

export const Checkout = ({ isFinish, setTabPayment, commandCode, setOpenCenterModal, openCenterModal, setMethodID, methodID, totalComanda, postCloseCommand, isLoadingCloseCommand }) => {
  const [payments, setPayments] = useState([]);
  const [openModalSplitPayment, setOpenModalSplitPayment] = useState([]);
  const refEndPage = useRef(null);
  const [showValue, setShowValue] = useState(totalComanda)

  const testParaIniciarDivNoFim = () => {
    if (refEndPage.current) {
      setTimeout(() => {
        refEndPage.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const installmentOptions = useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => {
      const numero = (index + 1).toString();
      return { name: numero, _id: numero };
    });
  }, []);


  useEffect(() => {
    if (!payments.length) {
      setShowValue(totalComanda)
    }
  }, [payments])

  return (
    <Container>
      <Header
        divider
        close
        onClick={() => setTabPayment(false)}
        title="Pagamento"
      >
        <span className="flex mx-2 items-center gap-2 text-4xl font-bold rounded-lg text-[var(--button-default)] cursor-pointer">
          {commandCode}
        </span>
      </Header>
      <Content pb="pb-28">
        <div className="flex justify-center items-center mt-6">
          <div className=" text-center px-4 py-2 text-6xl font-medium text-[var(--button-default)]">
            {currency(showValue)}
          </div>
          <span className="piscando h-12 w-[2px] bg-[var(--button-default)] "></span>
        </div>
        <div className="pt-0 flex gap-2 flex-col items-center justify-center opacity-0 animate-fade-in  "
          style={{
            animationDelay: `${0.05}s`,
            animationFillMode: "forwards",
          }}>
          <div ref={refEndPage} id="endModal" className="h-0" ></div>
          <span className="flex flex-col text-md w-full mb-3">
            <ComponentFragmentPayment
              setShowValue={setShowValue}
              showValue={showValue}
              payments={payments}
              setPayments={setPayments}
              testParaIniciarDivNoFim={testParaIniciarDivNoFim}
              totalComanda={totalComanda}
              paymentMethods={paymentMethods}
              setMethodID={setMethodID}
              methodID={methodID}
            />
          </span>
        </div>
      </Content>
      <Footer>
        <ButtonContainer
          onClick={postCloseCommand}
          text="Confirmar Pagamento"
          margin="mx-2 mb-2"
          hFull="h-12"
        />
      </Footer>
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
      {isFinish && (
        <CenterTop
          notCloseBg
          showX
          isOpen={openCenterModal}
          onClose={() => setOpenCenterModal(false)}
        >
          {installmentOptions.map((op, i) => (
            <option key={i} value={op._id}>
              {op.name === "1" ? '' : `${op.name} × `}  {currency(totalComanda / op._id)}
            </option>
          ))}
        </CenterTop>)
      }

    </Container>

  )
}
