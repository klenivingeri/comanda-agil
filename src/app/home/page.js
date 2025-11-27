"use client";
import { IconCode } from "public/icons/Codes";
import { IconCommand } from "public/icons/Command";
import { IconSearch } from "public/icons/Search";
import { useEffect, useState } from "react";
import { ButtonContainer } from "src/components/button";
import { Input } from "src/components/form/FormComponents";
import { Container } from "src/components/layout/Container";
import { Content } from "src/components/layout/Content";
import { Header } from "src/components/layout/Header";
import { Loading } from "src/components/loading/Loading";
import { useCommand } from "../../app/context/CommandContext";
import { useRouter } from "next/navigation";
import { CenterTop } from "src/components/modal/ModalTop";
import { currency } from "../utils/currency";
import { Box } from "src/components/Box";
import { MagnifyingGlass } from "public/icons/MagnifyingGlass";

const addZero = (text) => String(text?.trim()).padStart(3, 0);

export default function Empresa() {
  const [error, setError] = useState(false);
  const [code, setCode] = useState("");
  const [customer, setCustomer] = useState([]);
  const { _command } = useCommand();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const customer = localStorage.getItem("customer");
    setCustomer(JSON.parse(customer));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if(code.length === 0) return;

    try {
      _command.get(`?code=${addZero(code)}`);
    } catch (err) {
      setError(true);
    }
  }

  useEffect(() => {
    if (code) {
      if (_command.all.length === 0) {
        router.push(`/atendimento/${addZero(code)}`);
      } else if(_command.all.length === 1){
        const command = _command.all[0];
        router.push(`/atendimento/${command.code}-${command?._id}`);
      } 
      else {
        setOpenModal(true);
      }
    }
  }, [_command.all]);

  return (
    <Container>
      <Header divider menu title="Seja bem-vindo" />
      <Content isLoading={!customer[0]?.name} error={error}>
        <Box>
          <div className="my-2">
            <h1 className="text-4xl font-medium">{`Olá, ${
              customer[0]?.name || ""
            } :)`}</h1>
            <p className="text-[var(--text-default)]/70 font-medium mt-2">
              Sua produtividade começa aqui.
            </p>
          </div>

          <h3 className="font-medium text-xl">Pesquise por suas comandas</h3>
          <Input
            id="code"
            setValue={setCode}
            placeholder="Digite o numero da comanda"
            type="tel"
            error={code.trim() === ""}
            value={code}
            icon={<IconCode size="h-[22px] w-[22px]" />}
          />

          <div className="flex w-full gap-4">
            <ButtonContainer onClick={handleSubmit} margin="mt-1">
              <span className="pl-1 flex items-center gap-2 font-normal">
                {_command.isLoading ? (
                  <Loading isLoading={_command.isLoading} style="style3" />
                ) : (
                  <>
                    <MagnifyingGlass size="h-[20px] w-[20px]" /> Localizar
                  </>
                )}
              </span>
            </ButtonContainer>
            <ButtonContainer href="/comandas" margin="mt-1">
              <span className="pl-1 flex items-center gap-2 font-normal">
                <IconCommand size="h-[32px] w-[32px]" /> Ver todas
              </span>
            </ButtonContainer>
          </div>
        </Box>
      </Content>
      <CenterTop
        notCloseBg
        showX
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      >
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold text-center mb-2">OPS...</h1> 
          <p className="font-medium">Existem {_command.all.length} com o codigo {_command.all[0]?.code}</p>
          {_command.all?.map((command) => {
            const totalComanda = command?.subOrders.reduce((acc, item) => {
              const quantity = item?.quantity || 0;
              const price = item?.product?.price ?? item?.price ?? 0;
              return acc + quantity * price;
            }, 0);

            const allItems = command?.subOrders.reduce((acc, item) => {
              const quantity = item?.quantity || 0;
              return acc + quantity;
            }, 0);

            return (
              <div
                key={command._id}
                className="w-full grid grid-cols-12 my-2 py-2 h-17 content-center bg-[var(--bg-component)] justify-between border-2 border-[var(--bg-subTitle)] border-l-4 rounded-md shadow-lg shadow-[var(--bg-subTitle)]/50"
              >
                <div className="col-span-1 flex justify-center items-center">
                  {allItems}
                </div>

                <div className="col-span-7 flex justify-center items-center">
                  Itens = {currency(totalComanda)}
                </div>
                <div className="col-span-4 flex justify-end items-center pr-2">

                  <ButtonContainer href={`/atendimento/${command.code}-${command._id}-caixa`} margin="mt-1" >
                    Ver
                  </ButtonContainer>
                </div>
              </div>
            );
          })}
        </div>
      </CenterTop>
    </Container>
  );
}
