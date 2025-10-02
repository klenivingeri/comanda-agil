"use client";
import React, { useEffect, useState } from "react";
import { useConfig } from "../context/ConfigContext";
import { SelectComponent } from "../../components/form/SelectComponent";
import { Loading } from "../../components/loading/Loading";

import { Container } from "../../components/layout/Container";
import { Header, HeaderGrid } from "../../components/layout/Header";
import { IconDotMenu } from "../../../public/icons/DotMenu";
import { MenuMobile } from "../../components/menu/lateral/MenuMobile";
import { Content } from "../../components/layout/Content";
import { Button } from "src/components/button/Button";

const optionsColors = [
  { type: "btn-blue", name: "Azul" },
  { type: "btn-purple", name: "Roxo" },
  { type: "btn-green", name: "Verde" },
  { type: "btn-gray", name: "Cinza" },
  { type: "btn-orange", name: "Laranja" },
  { type: "btn-red", name: "Vermelho" },
];

export default function Configuracao() {
  const { handleVibrate, hasVibrate } = useConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [itemDefault, setItemDefault] = useState({ type: "", name: "" });

  const [error, setError] = useState(false);

  const handlesClearingCache = () => {
    localStorage.removeItem("items-command");
    localStorage.removeItem("menu");
  };

  const handleButtonColor = (color) => {
    const root = window.document.documentElement;
    const colorCurrent = root.classList.value;

    for (const option of optionsColors) {
      if (colorCurrent.includes(option?.type)) {
        root.classList.remove(option?.type);
        localStorage.setItem("theme-button", "");
      }
    }
    if (color !== "default") {
      root.classList.add(color);
      localStorage.setItem("theme-button", color);
    }
  };

  const handleOpenMenuMobile = () => {
    setOpenMenuMobile(!openMenuMobile);
  };

  const handleColorButton = (id, value) => {
    handleButtonColor(value.type);
    setItemDefault(value);
  };

  const handleResponseTouchOn = () => {
    handleVibrate("on");
  };

  const handleResponseTouchOff = () => {
    handleVibrate("off");
  };

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }
  useEffect(() => {
    const themeButton = localStorage.getItem("theme-button");
    if (themeButton) {
      const colorCurrent = optionsColors.find((op) => op.type === themeButton);
      setItemDefault(colorCurrent);
    }
  }, [hasVibrate]);

  return (
    <Container>
      <Header h="h-[40px]">
        <HeaderGrid>
          <div className="col-span-2 flex" onClick={handleOpenMenuMobile}>
            <IconDotMenu size="h-[32px] w-[32px]" />
          </div>

          <div className="col-span-8 flex items-center">
            <div className="w-full flex justify-center">
              <span className="text-md font-bold">Cadastrar Produto</span>
            </div>
          </div>
          <div className="col-span-2"></div>
        </HeaderGrid>
      </Header>
      <div className="mt-[50px] mb-[50px] flex-1 flex flex-col">
        <Content isLoading={isLoading} error={error}>
          <div className="w-full max-w-[500px] mx-auto">
            <div className="flex my-2 py-2 px-4 h-17 content-center bg-[var(--bg-component)] justify-between border-2 border-[var(--bg-subTitle)] border-l-4 rounded-md shadow-lg shadow-[var(--bg-subTitle)]/50">
              <div className="pt-3.5 ">Cor dos Botões</div>
              <SelectComponent
                id="colors"
                value={itemDefault}
                setValue={handleColorButton}
                required
                itemDefault={itemDefault}
                options={optionsColors}
              />
            </div>
            <div className="flex my-2 px-4 py-2 h-17 content-center bg-[var(--bg-component)] justify-between border-2 border-[var(--bg-subTitle)] border-l-4 rounded-md shadow-lg shadow-[var(--bg-subTitle)]/50 ">
              <div className="mt-3.5">Resposta tatil</div>
              <div className="flex items-center gap-2 ml-4">
                <Button
                  wFull="w-12"
                  hFull="h-8"
                  text="Sim"
                  press={hasVibrate === "on"}
                  onClick={handleResponseTouchOn}
                />
                <Button
                  wFull="w-13"
                  hFull="h-8"
                  text="Não"
                  press={hasVibrate === "off"}
                  onClick={handleResponseTouchOff}
                />
              </div>
            </div>
            <div className="flex my-2 px-4 py-2 h-17 content-center bg-[var(--bg-component)] justify-between border-2 border-[var(--bg-subTitle)] border-l-4 rounded-md shadow-lg shadow-[var(--bg-subTitle)]/50 ">
              <div className="mt-3.5">Cache do aplicativo</div>
              <div className="flex items-center gap-2 ml-4">
                <Button
                  wFull="w-28"
                  hFull="h-8"
                  text="Limpa"
                  onClick={handlesClearingCache}
                />
              </div>
            </div>
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
