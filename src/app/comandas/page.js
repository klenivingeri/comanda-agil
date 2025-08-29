"use client";
import dayjs from "dayjs";
import React, { useEffect, useState, useRef } from "react";
import { InputSearch } from "../../components/input/inputSearch";
import { Container } from "../../components/layout/Container";
import { Content } from "../../components/layout/Content";
import { Header } from "../../components/layout/Header";
import { IconDotMenu } from "../../../public/icons/DotMenu";
import { currency } from "../utils/currency";
import { IconMenuList } from "../../../public/icons/MenuList";
import { ModalBot } from "@/components/modal/ModalBot";

import { IconCreate } from "../../../public/icons/Create";
import { LoadingFullScreen } from "@/components/loading/LoadingFullScreen";
import Link from "next/link";

export default function Comandas() {
  const [comandas, setComandas] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputText = (e) => {
    const text = e.target.value;
    setText(text);
  };

  const handleOpenModal = () => {
    setOpenModal(!openModal);
    if (!openModal) {
      //setTimeout(handleFocusInput, 1000);
    }
  };

  const getComandas = async () => {
    const res = await fetch(`/api/comandas?id=test`, {
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

  return (
    <Container>
      <Header>
        <div className="flex flex-col w-full gap-2 justify-start">
          <div className="w-full grid grid-cols-12 px-2 h-[40px]">
            <div className="col-span-2 flex items-center pt-2 gap-1"></div>
            <div className="col-span-8 flex items-center">
              <div className="w-full flex justify-center">
                <span className="text-md font-bold">Comandas</span>
              </div>
            </div>
            <div className="col-span-2 flex items-end justify-end pt-1">
              <IconDotMenu size="h-[32px] w-[32px]" />
            </div>
          </div>
          <div className="w-full grid grid-cols-12 px-2 gap-2">
            <div className="col-span-12 flex items-center gap-2">
              <InputSearch setInputText={setInputText} _isNumeric />
              <button
                onClick={handleOpenModal}
                className="relative text-black rounded-md flex justify-center items-center h-[40px] px-2"
              >
                <IconCreate size="h-[32px] w-[32px]" />
              </button>
            </div>
          </div>
        </div>
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
                  href={`/atendimento?id=${c.id}`}
                  style={{ textDecoration: "none" }}
                  key={idx}
                  className="relative h-30 w-40 border-2 p-3 rounded-2xl shadow-lg bg-blue-400 shadow-blue-200 text-white flex flex-col justify-between"
                >
                  <div className="flex justify-end text-sm leading-none">
                    {currency(c.total)}
                  </div>
                  <div className="flex justify-center text-lg font-bold leading-none">
                    {c.name}
                  </div>
                  <div className="flex justify-start text-sm leading-none">
                    {dayjs(c.date).format("DD/MM")}
                  </div>
                  <span
                    style={{ color: "#8EC5FF" }}
                    className="absolute bottom-2 right-0 "
                  >
                    <IconMenuList size="h-[50px] w-[50px]" />
                  </span>
                </Link>
              ))}
          </div>
        </Content>
      </div>
      <LoadingFullScreen isLoading={openModal} />
    </Container>
  );
}
