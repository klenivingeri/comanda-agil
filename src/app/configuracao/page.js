"use client";
import React, { useEffect, useState } from "react";
import { useConfig } from "../context/ConfigContext";
import { useCleaningTrigger } from "../context/CleaningContext";
import { SelectComponent } from "../../components/form/SelectComponent";

import { useRouter } from "next/navigation";
import { Container } from "../../components/layout/Container";
import { Header } from "../../components/layout/Header";
import { Content } from "../../components/layout/Content";
import { ButtonContainer } from "src/components/button";


const optionsColors = [
  { type: "btn-blue", name: "Azul" },
  { type: "btn-purple", name: "Roxo" },
  { type: "btn-green", name: "Verde" },
  { type: "btn-gray", name: "Cinza" },
  { type: "btn-orange", name: "Laranja" },
  { type: "btn-red", name: "Vermelho" },
];

export default function Configuracao() {
  const { triggerCleaning } = useCleaningTrigger();
  const { _config } = useConfig();
  const [itemDefault, setItemDefault] = useState({ type: "", name: "" });

  const handlesClearingCache = () => {
    triggerCleaning();
  };

  const handleButtonColor = (color) => {
    const root = window.document.documentElement;
    const colorCurrent = root.classList.value;

    for (const option of optionsColors) {
      if (colorCurrent.includes(option?.type)) {
        root.classList.remove(option?.type);
        localStorage.removeItem("theme-button");
      }
    }
    if (color !== "default") {
      root.classList.add(color);
      localStorage.setItem("theme-button", color);
    }
  };

  const handleColorButton = (id, value) => {
    handleButtonColor(value.type);
    setItemDefault(value);
  };

  const handleResponseTouchOn = () => {
    _config.handleVibrate("on");
  };

  const handleResponseTouchOff = () => {
    _config.handleVibrate("off");
  };

  useEffect(() => {
    const themeButton = localStorage.getItem("theme-button");
    if (themeButton) {
      const colorCurrent = optionsColors.find((op) => op.type === themeButton);
      setItemDefault(colorCurrent);
    }
  }, [_config.hasVibrate]);

  return (
    <Container>
      <Header divider title="Configuração" />
      <Content>
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
              <ButtonContainer
                wFull="w-12"
                hFull="h-8"
                text="Sim"
                press={_config.hasVibrate === "on"}
                vibre="off"
                onClick={handleResponseTouchOn}
              />
              <ButtonContainer
                wFull="w-13"
                hFull="h-8"
                text="Não"
                vibre="off"
                press={_config.hasVibrate === "off"}
                onClick={handleResponseTouchOff}
              />
            </div>
          </div>
          <div className="flex my-2 px-4 py-2 h-17 content-center bg-[var(--bg-component)] justify-between border-2 border-[var(--bg-subTitle)] border-l-4 rounded-md shadow-lg shadow-[var(--bg-subTitle)]/50 ">
            <div className="mt-3.5">Cache do aplicativo</div>
            <div className="flex items-center gap-2 ml-4">
              <ButtonContainer
                wFull="w-28"
                hFull="h-8"
                text="Limpa"
                onClick={handlesClearingCache}
              />
            </div>
          </div>
        </div>
      </Content>
    </Container>
  );
}
