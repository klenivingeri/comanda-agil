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
import { useUserConfig } from "src/app/context/UserContext";
import { CenterModal } from "../../components/modal";
import { Checkout } from "src/components/checkout";

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
  const [openCenterModal, setOpenCenterModal] = useState(false);

  const handleOpenCenterModal = () => {
    setOpenCenterModal(true);
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
                isEmpty(commandID)
              }
              onClick={handleOpenCenterModal}
              wFull="w-28"
              margin="mx-2 mb-3"
              style="buttonGreen"
            >
              FINALIZAR
            </ButtonContainer>
          </div>
        </div>
      </Footer>

      <CenterModal
        isOpen={openCenterModal}
        onClose={() => setOpenCenterModal(false)}
      >
        <Checkout totalComanda={totalComanda} commandID={commandID} />
      </CenterModal>
    </Container>
  );
};
