"use client";
import React, { useEffect, useState } from "react";
import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { currency } from "../utils/currency";
import { ButtonContainer } from "../../components/button";
import { Loading } from "../../components/loading/Loading";
import { IconEdit } from "public/icons/Edit";
import { Container } from "../../components/layout/Container";
import { isEmpty } from "src/app/utils/empty";
import { Checkout } from "src/components/checkout";
import { Content } from "src/components/layout/Content";
import { CenterTop } from "src/components/modal/ModalTop";
import { RULES } from "../utils/constants";
import { IconMoney } from "public/icons/Money";
import { IconQrcode } from "public/icons/QrCode";

export const Comanda = ({
  handleOpenModal,
  totalComanda,
  children,
  saveCommand,
  itemsSelected,
  isLoadingCreate,
  handleShowDelete,
  commandID,
  commandCode,
  setTabPayment
}) => {
  const [customer, setCustomer] = useState([]);

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
    const customer = localStorage.getItem("customer");
    setCustomer(JSON.parse(customer));
    const a = setTimeout(() => testParaIniciarDivNoFim(), 50);
    return () => clearTimeout(a);
  }, []);

  return (
    <Container>
      <Header
        divider
        close
        onClick={handleOpenModal}
        title="Comanda"
      >
        <div className="flex">
          { RULES.ADMIN.includes(customer[0]?.role) && (
            <ButtonContainer
              onClick={handleShowDelete}
              hFull="h-8"
              wFull="w-14"
              margin="mx-1 mt-1"
            >
              <IconEdit size="h-[23px] w-[23px]" />
            </ButtonContainer>
          )}
          <ButtonContainer hFull="h-8" wFull="w-14" margin="mx-1 mt-1">
            <IconQrcode size="h-[23px] w-[23px]" />
          </ButtonContainer>
                  <span className="flex mr-4 items-center gap-2 text-4xl font-bold rounded-lg text-[var(--button-default)] cursor-pointer">
          {commandCode}
        </span>
        </div>
      </Header>

      <Content isLoading={isLoadingCreate} mb="mb-[190px]" endPage>
        {children}
      </Content>

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
          <div className="relative w-full flex justify-center items-center">
            <ButtonContainer
              disabled={itemsSelected?.length == 0}
              margin="mx-2 mb-1"
              hFull="h-12"
              onClick={saveCommand}
            >
              {!isLoadingCreate ? (
                <p className="text-sm">
                  LANÇAR ITEM{itemsSelected?.length > 1 && "S"}
                </p>
              ) : (
                <Loading isLoading={isLoadingCreate} style="style3" />
              )}
            </ButtonContainer>
            {RULES.MODERATOR.includes(customer[0]?.role) && (
              <ButtonContainer
                disabled={!itemsSelected?.length == 0 || isEmpty(commandID)}
                onClick={() =>setTabPayment(true)}
                hFull="h-12"
                margin="mx-2 mb-1"
              >
                <IconMoney size="h-[30px] w-[30px]" /> <p className="ml-2">Receber</p>
              </ButtonContainer>
            )}
          </div>
        </div>
      </Footer>
    </Container>
  );
};
