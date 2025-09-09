"use client";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { InputSearch } from "../../components/input/inputSearch";
import { Container } from "../../components/layout/Container";
import { Content } from "../../components/layout/Content";
import { Header, HeaderGrid } from "../../components/layout/Header";
import { IconDotMenu } from "../../../public/icons/DotMenu";
import { currency } from "../utils/currency";
import { IconMenuList } from "../../../public/icons/MenuList";

import { IconCreate } from "../../../public/icons/Create";
import Link from "next/link";
import { MenuMobile } from "../../components/menu/lateral/MenuMobile";

export default function Comandas() {
  const [comandas, setComandas] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

    setComandas(itemsDaComanda.records);
    setIsLoading(false);
  };

  useEffect(() => {
    getComandas();
  }, []);

  const hasComanda = comandas?.some((c) => c.name === inputText);

  return (
    <Container>
      <Header>
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
              href={
                inputText.length > 0 && !hasComanda
                  ? `/atendimento/${inputText}`
                  : ""
              }
              style={{ textDecoration: "none" }}
              className={`relative ${
                inputText.length > 0 && !hasComanda
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
        <Content isLoading={isLoading}>
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
                  className="relative h-30 w-28 border-1 border-[var(--bg-subTitle)] p-3 rounded-2xl bg-[var(--button-default)] text-white flex flex-col justify-between"
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
