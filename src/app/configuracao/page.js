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
  const [responseTouch, setResponseTouch] = useState({
    type: "",
    name: "",
  });

  const [error, setError] = useState(false);

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

  const handleResponseTouch = (id, value) => {
    handleVibrate(value.type);
    setResponseTouch(value);
  };

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }
  useEffect(() => {
    const themeButton = localStorage.getItem("theme-button");
    setResponseTouch(
      hasVibrate === "on"
        ? { type: "on", name: "Sim" }
        : { type: "off", name: "Não" }
    );
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
            <div className="flex justify-between">
              <div className="mt-4">Cor dos Botões</div>
              <SelectComponent
                id="colors"
                value={itemDefault}
                setValue={handleColorButton}
                required
                itemDefault={itemDefault}
                options={optionsColors}
              />
            </div>
            <div className="flex justify-between ">
              <div className="mt-4">Resposta tatil</div>
              <SelectComponent
                id="colors"
                value={responseTouch}
                setValue={handleResponseTouch}
                required
                itemDefault={responseTouch}
                options={[
                  { type: "on", name: "Sim" },
                  { type: "off", name: "Não" },
                ]}
              />
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
