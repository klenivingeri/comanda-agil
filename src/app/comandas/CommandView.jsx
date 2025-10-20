"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { InputSearch } from "../../components/input/inputSearch";
import { Container } from "../../components/layout/Container";
import { Content } from "../../components/layout/Content";
import { Header, HeaderGrid } from "../../components/layout/Header";
import { MenuMobileContainer } from "../../components/menu/lateral";
import { ButtonContainer } from "../../components/button";

import { IconMenuList } from "../../../public/icons/MenuList";
import { IconDotMenu } from "../../../public/icons/DotMenu";
import { IconCreate } from "../../../public/icons/Create";

import { useUserConfig } from "src/app/context/UserContext";
import { RULES } from "../utils/constants";
import Link from "next/link";

export default function CommandView({ commandAll, isLoadingCommand, errorCommand }) {
  const { _user } = useUserConfig();
  const [inputText, setInputText] = useState("");
  const [hasComanda, setHasComanda] = useState(true);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const comprimentoDesejado = 3;
  const zero = "0";

  const handleOpenMenuMobile = () => {
    setOpenMenuMobile(!openMenuMobile);
  };

  useEffect(() => {
    if (inputText.length) {
      const hasMatch = commandAll?.some((c) => {
        return c.code.toLowerCase().includes(inputText.trim().toLowerCase());
      });
      setHasComanda(hasMatch);
    }
  }, [inputText]);

  return (
    <Container>
      <Header divider>
        <HeaderGrid>
          <div onClick={handleOpenMenuMobile} className="col-span-2">
            <IconDotMenu size="h-[32px] w-[32px]" />
          </div>

          <div className="col-span-8 mt-1">
            <div className="w-full flex justify-center">
              <span className="text-xs font-bold">COMANDAS</span>
            </div>
          </div>
          <div className="col-span-2 flex items-center"></div>
        </HeaderGrid>
        <HeaderGrid>
          <div className="col-span-12 flex items-end gap-2">
            <InputSearch setInputText={setInputText} _isNumeric />
            <ButtonContainer
              href={`/atendimento/${String(inputText).padStart(
                comprimentoDesejado,
                zero
              )}`}
              disabled={hasComanda}
              wFull="w-[50px]"
            >
              <IconCreate size="h-[32px] w-[32px]" />
            </ButtonContainer>
          </div>
        </HeaderGrid>
      </Header>
      <Content isLoading={isLoadingCommand} error={errorCommand} newDiv>
        <div
          className="flex flex-wrap justify-center gap-2"
          style={{ alignContent: "flex-start" }}
        >
          {commandAll
            ?.sort((a, b) => {
              const codeA = a.code;
              const codeB = b.code;
              return codeA.localeCompare(codeB);
            })
            .filter((c) => {
              if (!inputText.length) return true;
              return c.code
                .toLowerCase()
                .includes(inputText.trim().toLowerCase());
            })
            .map((c, idx) => (
              <div key={idx} className="grid grid-cols-12 p-2 w-full bg-[var(--bg-component)]">
                <Link className=" flex text-[var(--button-default)] gap-1 bottom-2 right-0 col-span-3 items-center" href={`/atendimento/${c.code}-${c._id}`}>
                  <IconMenuList size="h-[40px] w-[40px]" />
                  <span className="flex items-center text-[var(--text-default)] text-2xl font-bold"> {c.code}</span>
                </Link>
                <Link className="col-span-3 flex justify-center items-center text-sm leading-none text-[var(--text-default)]/50 " href={`/atendimento/${c.code}-${c._id}`}>
                  {dayjs(c.date).format("DD/MM")}
                </Link>
                <div className="col-span-6 flex items-center text-sm">
                  <ButtonContainer
                    hFull="h-8"
                    wFull="w-full"
                    margin="mx-1 mt-1"
                    style={RULES.MODERATOR.includes(_user.all[0]?.role) ? "buttonInline" : 'buttonDefault'}
                    href={`/atendimento/${c.code}-${c._id}`}
                  >
                    Comanda
                  </ButtonContainer>
                  {RULES.MODERATOR.includes(_user.all[0]?.role) && (
                    <ButtonContainer
                      href={`/atendimento/${c.code}-${c._id}-caixa`}
                      hFull="h-8"
                      wFull="w-full"
                      margin="mx-1 mt-1"
                    >
                      <span className="font-normal">Caixa</span>
                    </ButtonContainer>
                  )}
                </div>
              </div>
            ))}
        </div>
      </Content>

      <MenuMobileContainer
        handleOpenModal={handleOpenMenuMobile}
        openModal={openMenuMobile}
      />
    </Container>
  );
}

// <div key={idx} className="grid grid-cols-12 p-2 w-full bg-[var(--bg-component)]">
//   <span className="text-[var(--button-disabled)] bottom-2 right-0 col-span-2 items-center">
//     <IconMenuList size="h-[40px] w-[40px]" />

//   </span>
//   <span className="col-span-2 flex items-center text-[var(--text-default)] font-bold"> {c.code}</span>
//   <div className="col-span-3"></div>
//   <div className="col-span-5 flex items-center text-sm">
//     <ButtonContainer

//       hFull="h-8"
//       wFull="w-full"
//       margin="mx-1 mt-1"
//       style="buttonBlue"
//     >
//       Comanda
//     </ButtonContainer>
//     {RULES.MODERATOR.includes(_user.all[0]?.role) && (
//       <ButtonContainer

//         hFull="h-8"
//         wFull="w-full"
//         margin="mx-1 mt-1"
//         style="buttonGreen"
//       >
//         Caixa
//       </ButtonContainer>
//     )}
//   </div>
// </div>




{/* <div key={idx} className="flex flex-col gap-1 p-1 border-2 border-[var(--button-default)]  rounded-md shadow-lg shadow-[var(--bg-subTitle)]/50">
                <ButtonContainer
                  href={`/atendimento/${c.code}-${c._id}`}
                  wFull="w-26"
                  hFull="h-20"
                  inline
                  bg='bg-[var(--button-default)]'
                >
                  <div className="h-20 w-26 p-2 text-white flex flex-col justify-between rounded-md">
                    <div className="flex  text-3xl font-bold leading-none">
                      {c.code}
                    </div>
                    <div className="flex justify-start text-sm leading-none">
                      {dayjs(c.date).format("DD/MM")}
                    </div>
                    <span className="text-[var(--button-disabled)] absolute bottom-1 right-0">
                      <IconMenuList size="h-[40px] w-[40px]" />
                    </span>
                  </div>
                </ButtonContainer>
                {RULES.MODERATOR.includes(_user.all[0]?.role) && (
                  <ButtonContainer
                    href={`/atendimento/${c.code}-${c._id}-caixa`}
                    hFull="h-8"
                    wFull="w-full"
                    margin="mt-1"
                  >
                    <span className="">Caixa</span>
                  </ButtonContainer>)}
              </div> */}