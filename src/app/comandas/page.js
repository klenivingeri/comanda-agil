"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";

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
import { isEmpty } from "../utils/empty";

export default function Comandas() {
  const [comandas, setComandas] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasComanda, setHasComanda] = useState(true);
  const [error, setError] = useState(false);

  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const handleOpenMenuMobile = () => {
    setOpenMenuMobile(!openMenuMobile);
  };

  const getComandas = async () => {
    const res = await fetch(`/api/comandas`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const itemsDaComanda = await res.json();
    setIsLoading(false);

    if (isEmpty(itemsDaComanda?.records)) {
      setError(true);
      return;
    }

    setComandas(itemsDaComanda.records);
  };

  useEffect(() => {
    getComandas();
  }, []);

  useEffect(() => {
    if (inputText.length) {
      const hasMatch = comandas?.some((c) => {
        return c.code.toLowerCase().includes(inputText.trim().toLowerCase());
      });
      setHasComanda(hasMatch);
    }
  }, [comandas, inputText]);

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
        <Content isLoading={isLoading} error={error}>
          <div
            className="flex flex-wrap justify-center gap-4"
            style={{ alignContent: "flex-start" }}
          >
            {comandas
              ?.filter((c) => {
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
                      {c.name}
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
