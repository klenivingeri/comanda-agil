"use client";
import React, { useEffect, useState } from "react";
import { IconX } from "../../../public/icons/X";
import { Footer } from "../../components/layout/Footer";
import { Header, HeaderGrid } from "../../components/layout/Header";
import { currency } from "../utils/currency";
import { ButtonContainer } from "../../components/button";
import { Loading } from "../../components/loading/Loading";
import { RotateImage } from "src/app/atendimento/Atendimento";
import { IconEdit } from "public/icons/Edit";
import { Container } from "../../components/layout/Container";
import { isEmpty } from "src/app/utils/empty";
import { useToast } from "src/hooks/useToast";
import { useUserConfig } from "src/app/context/UserContext";
import { CenterModal } from "../../components/modal";
import { IconChecked } from "public/icons/Checked";

export const Comanda = ({
  handleOpenModal,
  totalComanda,
  children,
  saveCommand,
  itemsSelected,
  isLoadingCreate,
  rotated,
  handleShowDelete,
  commandID,
}) => {
  const { _user } = useUserConfig();
  const toast = useToast();
  const [isLoadingCloseCommand, setisLoadingCloseCommand] = useState(false);
  const [openCenterModal, setOpenCenterModal] = useState(false);
  const [methodID, setMethodID] = useState("CARD");
  const [statusID, setStatusID] = useState("PAID");
  const [isFinish, setIsFinish] = useState(false);

  const handleOpenCenterModal = () => {
    setOpenCenterModal(true);
  };

  const postCloseCommand = async () => {
    setisLoadingCloseCommand(true);
    try {
      const resp = await fetch(
        `/api/comandas/close?_id=${commandID}&paymentMethod=${methodID}&statusId=${statusID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await resp.json();
      setIsFinish(true);
      toast.success("Comanda finaliza com sucesso");
    } catch (_) {
      toast.error("Ocorreu um erro fechar a comanda!");
    } finally {
      setisLoadingCloseCommand(false);
    }
  };

  const score = 200;

  const testParaIniciarDivNoFim = () => {
    const div = document.getElementById("minhaDiv");
    if (div) {
      div.scrollTo({
        top: div.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    const a = setTimeout(() => testParaIniciarDivNoFim(), 50);
    return () => clearTimeout(a);
  }, []);

  return (
    <Container>
      <Header h="h-[50px]" divider>
        <HeaderGrid>
          <div className="flex col-span-2 gap-4">
            <div onClick={handleOpenModal}>
              <IconX size="h-[32px] w-[32px]" />
            </div>
            {_user.all[0]?.role === "ADMIN" && (
              <div className="flex">
                <ButtonContainer
                  onClick={handleShowDelete}
                  hFull="h-8"
                  wFull="w-14"
                  margin="mx-2 mt-1"
                >
                  <IconEdit size="h-[23px] w-[23px]" />
                </ButtonContainer>
              </div>
            )}
          </div>
          <div className="col-span-8 mt-2">
            <div className="w-full flex justify-center">
              <span className="text-xs font-bold">COMANDA</span>
            </div>
          </div>
          <div className="flex col-span-2 text-xs mt-2 justify-between">
            <RotateImage rotated={rotated} />
            {score}k
          </div>
        </HeaderGrid>
      </Header>

      <div className="relative w-full h-full flex flex-col overflow-auto">
        <div
          className="flex-1 overflow-auto mt-[40px] mb-[180px] p-2"
          id="minhaDiv"
        >
          {children}
        </div>
      </div>

      <Footer
        bg="bg-[var(--bg-component)]"
        h="h-[188px] rounded-t-2xl border-2 border-[var(--bg-subTitle)] "
      >
        <div className="flex justify-center flex-col items-center w-full">
          <div className="w-full px-6 font-bold pb-3">
            <div className="flex justify-between items-start">
              <span className="">SubTotal</span>
              <span className="whitespace-nowrap font-extrabold">
                {currency(totalComanda)}
              </span>
            </div>
            <div className=" flex justify-between items-start">
              <span className="whitespace-nowrap">Desconto</span>
              <span className="whitespace-nowrap font-extrabold">
                {currency(0)}
              </span>
            </div>
            <hr className="my-3" />
            <div className=" flex justify-between items-start font-extrabold">
              <span className="whitespace-nowrap">Total</span>
              <span className="whitespace-nowrap text-[var(--button-default)]">
                {currency(totalComanda)}
              </span>
            </div>
          </div>
          <div className="relative w-full flex justify-center items-center ">
            <ButtonContainer
              disabled={itemsSelected?.length == 0}
              margin="mx-2 mb-3"
              onClick={saveCommand}
            >
              {!isLoadingCreate ? (
                "LANÇAR ITEMS NA COMANDA"
              ) : (
                <Loading isLoading={isLoadingCreate} style="style3" />
              )}
            </ButtonContainer>
            <ButtonContainer
              disabled={
                !itemsSelected?.length == 0 ||
                isLoadingCloseCommand ||
                isEmpty(commandID)
              }
              onClick={handleOpenCenterModal}
              wFull="w-28"
              margin="mx-2 mb-3"
              style="buttonGreen"
            >
              {!isLoadingCloseCommand ? (
                "FINALIZAR"
              ) : (
                <Loading isLoading={isLoadingCloseCommand} style="style3" />
              )}
            </ButtonContainer>
          </div>
        </div>
      </Footer>

      <CenterModal
        isOpen={openCenterModal}
        onClose={() => setOpenCenterModal(false)}
      >
        {!isFinish ? (
          <div className="p-4 pt-8 flex flex-col items-center text-center">
            <span className="text-2xl font-extrabold  mb-2">
              Método de Pagamento
            </span>
            <div className="flex w-full gap-2 mt-2">
              <ButtonContainer
                onClick={() => setMethodID("CARD")}
                hFull="h-10"
                press={methodID === "CARD"}
              >
                Cartão
              </ButtonContainer>
              <ButtonContainer
                onClick={() => setMethodID("CASH")}
                hFull="h-10"
                press={methodID === "CASH"}
              >
                Dinheiro
              </ButtonContainer>
              <ButtonContainer
                onClick={() => setMethodID("PIX")}
                hFull="h-10"
                press={methodID === "PIX"}
              >
                Pix
              </ButtonContainer>
            </div>
            <div className="w-full bg-gray-100  p-4 rounded-lg mt-4 border border-gray-200">
              <p className="text-3xl font-semibold text-gray-900">
                {currency(totalComanda)}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row w-full gap-3 mt-6">
              <ButtonContainer
                onClick={postCloseCommand}
                text="Confirmar"
                style="buttonGreen"
                hFull="h-10"
              />
            </div>
          </div>
        ) : (
          <div className="p-4 pt-8 flex flex-col items-center text-center">
            {!isLoadingCloseCommand ? (
              <>
                <div className="flex justify-center mb-4 items-center h-14 w-14 text-[var(--button-green-default)] rounded-2xl bg-[var(--button-green-disabled)] ">
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
                    hFull="h-10"
                  />
                </div>
              </>
            ) : (
              <Loading isLoading={isLoadingCloseCommand} style="style3" />
            )}
          </div>
        )}
      </CenterModal>
    </Container>
  );
};
