"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";

import { InputSearch } from "../../components/input/inputSearch";
import { Container } from "../../components/layout/Container";
import { Content } from "../../components/layout/Content";
import { Header, HeaderGrid } from "../../components/layout/Header";
import { MenuMobile } from "../../components/menu/lateral/MenuMobile";

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
        return c.id.toLowerCase().includes(inputText.trim().toLowerCase());
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
          <div className="col-span-12 flex items-center gap-2">
            <InputSearch setInputText={setInputText} _isNumeric />
            <Link
              href={!hasComanda ? `/atendimento/${inputText}` : ""}
              style={{ textDecoration: "none" }}
              className={`relative ${
                !hasComanda
                  ? "bg-[var(--button-default)]"
                  : "bg-[var(--button-disabled)]"
              } rounded-md flex justify-center items-center h-[40px] px-3  text-white`}
            >
              <IconCreate size="h-[32px] w-[32px]" />
            </Link>
          </div>
        </HeaderGrid>
      </Header>
      <div className="mt-[95px] mb-[50px] flex-1 flex flex-col">
        <Content isLoading={isLoading} error={error}>
          <div
            className="flex flex-wrap justify-center gap-4"
            style={{ alignContent: "flex-start" }}
          >
            {comandas
              ?.filter((c) => {
                if (!inputText.length) return true;
                return c.id
                  .toLowerCase()
                  .includes(inputText.trim().toLowerCase());
              })
              .map((c, idx) => (
                <Link
                  href={`/atendimento/${c.name}`}
                  style={{ textDecoration: "none" }}
                  key={idx}
                  className="relative h-30 w-28 border-1 border-[var(--button-disabled)] ring-1 ring-[var(--button-focus)]/50 p-3 rounded-md bg-[var(--button-default)] text-white flex flex-col justify-between"
                >
                  <div className="flex justify-end text-sm leading-none">
                    {currency(
                      c?.items?.reduce(
                        (acc, item) =>
                          acc + (item?.quantity * item?.price || 0),
                        0
                      )
                    )}
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
                </Link>
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
