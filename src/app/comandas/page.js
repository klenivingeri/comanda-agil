"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useConfig } from "../../app/context/ConfigContext";

import { InputSearch } from "../../components/input/inputSearch";
import { Container } from "../../components/layout/Container";
import { Content } from "../../components/layout/Content";
import { Header, HeaderGrid } from "../../components/layout/Header";
import { MenuMobile } from "../../components/menu/lateral/MenuMobile";
import { Button } from "../../components/button/Button";

import { IconMenuList } from "../../../public/icons/MenuList";
import { IconDotMenu } from "../../../public/icons/DotMenu";
import { IconCreate } from "../../../public/icons/Create";

import { currency } from "../utils/currency";

export default function Comandas() {
  const { _command } = useConfig();
  const [inputText, setInputText] = useState("");
  const [hasComanda, setHasComanda] = useState(true);

  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const handleOpenMenuMobile = () => {
    setOpenMenuMobile(!openMenuMobile);
  };

  useEffect(() => {
    _command.get();
  }, []);

  useEffect(() => {
    if (inputText.length) {
      const hasMatch = _command.all?.some((c) => {
        return c.code.toLowerCase().includes(inputText.trim().toLowerCase());
      });
      setHasComanda(hasMatch);
    }
  }, [_command.all, inputText]);

  return (
    <Container>
      <Header divider>
        <HeaderGrid>
          <div onClick={handleOpenMenuMobile} className="col-span-2">
            <IconDotMenu size="h-[32px] w-[32px]" />
          </div>

          <div className="col-span-8 flex items-center">
            <div className="w-full flex justify-center">
              <span className="text-md font-bold">Comandas</span>
            </div>
          </div>
          <div className="col-span-2 flex items-center"></div>
        </HeaderGrid>
        <HeaderGrid>
          <div className="col-span-12 flex items-end gap-2">
            <InputSearch setInputText={setInputText} _isNumeric />
            <Button
              href={`/atendimento/${inputText}`}
              disabled={hasComanda}
              wFull="w-[50px]"
            >
              <IconCreate size="h-[32px] w-[32px]" />
            </Button>
          </div>
        </HeaderGrid>
      </Header>
      <div className="mt-[108px] mb-[50px] flex-1 flex flex-col">
        <Content isLoading={_command.isLoading} error={_command.error}>
          <div
            className="flex flex-wrap justify-center gap-4"
            style={{ alignContent: "flex-start" }}
          >
            {_command.all
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
                <Button
                  href={`/atendimento/${c.code}-${c._id}`}
                  wFull="w-28"
                  hFull="h-30"
                  key={idx}
                >
                  <div className="h-30 w-28 p-3 text-white flex flex-col justify-between">
                    <div className="flex justify-end text-sm leading-none">
                      {currency(c.payment.amount)}
                    </div>
                    <div className="flex justify-center text-3xl font-bold leading-none">
                      {c.code}
                    </div>
                    <div className="flex justify-start text-sm leading-none">
                      {dayjs(c.date).format("DD/MM")}
                    </div>
                    <span className="text-[var(--button-disabled)] absolute bottom-2 right-0">
                      <IconMenuList size="h-[40px] w-[40px]" />
                    </span>
                  </div>
                </Button>
              ))}
          </div>
        </Content>
      </div>
      <MenuMobile
        handleOpenModal={handleOpenMenuMobile}
        openModal={openMenuMobile}
      />
    </Container>
  );
}
