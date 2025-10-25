"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { Container } from "../../components/layout/Container";
import { Content } from "../../components/layout/Content";
import { Header } from "../../components/layout/Header";
import { ButtonContainer } from "../../components/button";
import { IconMenuList } from "../../../public/icons/MenuList";

import { IconCreate } from "../../../public/icons/Create";
import { useRouter } from "next/navigation";
import { useUserConfig } from "src/app/context/UserContext";
import { RULES } from "../utils/constants";
import Link from "next/link";

const addZero = (text) => String(text?.trim()).padStart(3, 0)

export default function CommandView({ commandAll, isLoadingCommand, errorCommand }) {
  const { _user } = useUserConfig();
  const [inputText, setInputText] = useState("");
  const [hasComanda, setHasComanda] = useState(true);
  const [oneComanda, setOneComanda] = useState({});
  const router = useRouter();

  const handleCommandID = () => {
    let pathRouter = oneComanda?.code
      ? `${addZero(oneComanda?.code)}-${oneComanda._id}`
      : addZero(inputText);

    router.push(`/atendimento/${pathRouter}`);
  }

  useEffect(() => {
    if (inputText.length) {
      const hasMatch = commandAll?.filter((c) => {
        return c.code.toLowerCase().includes(addZero(inputText));
      });
      setHasComanda(hasMatch.length > 0);
      setOneComanda(hasMatch.length === 1 ? hasMatch[0] : {})
    } else {
      setHasComanda(true);
      setOneComanda({})
    }
  }, [inputText]);


  const columnsClass = RULES.MODERATOR.includes(_user.all[0]?.role) ? "grid-cols-1" : "grid-cols-2";
  return (
    <Container>
      <Header
        menu
        divider
        title="Comandas"
        setInputText={setInputText}
        formSubmit={handleCommandID}
      >
        <ButtonContainer
          href={`/atendimento/${addZero(inputText)}`}
          disabled={hasComanda}
          wFull="w-[50px]"
          hFull="h-11"
          margin="mt-1"
        >
          <IconCreate size="h-[32px] w-[32px]" />
        </ButtonContainer>
      </Header>
      <Content isLoading={isLoadingCommand} error={errorCommand} margin="mt-[65px]">
        <div
          className={`grid gap-2 ${columnsClass}`}
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
                .includes(addZero(inputText));
            })
            .map((c, idx) => (
              <div key={idx} className="flex p-1 border-2 border-[var(--button-progress)] hover:bg-[var(--button-progress)]/10 rounded-md shadow-lg shadow-[var(--bg-subTitle)]/50 bg-[var(--bg-component)]">
                <Link className="grid grid-cols-12 p-2 flex-col w-full" href={`/atendimento/${c.code}-${c._id}`}>
                  <div className=" flex text-[var(--button-default)] gap-1 bottom-2 right-0 col-span-3 items-center">
                    <IconMenuList size="h-[40px] w-[40px]" />
                  </div>
                  <div className=" flex text-[var(--button-default)] gap-1 bottom-2 right-0 col-span-6 justify-center items-center">
                    <span className="flex items-center text-[var(--text-default)] text-3xl font-bold"> {c.code}</span>
                  </div>

                  <div className="col-span-3 flex justify-center items-center text-sm leading-none text-[var(--text-default)]/50">
                    {dayjs(c.date).format("DD/MM")}
                  </div>
                </Link>
                {RULES.MODERATOR.includes(_user.all[0]?.role) && (
                  <ButtonContainer
                    href={`/atendimento/${c.code}-${c._id}-caixa`}
                    hFull="h-11"
                    wFull="w-30"
                    margin="mx-1 mt-2"
                  >
                    <span className="font-normal">Comanda</span>
                  </ButtonContainer>
                )}
              </div>
            ))}
        </div>
      </Content>
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