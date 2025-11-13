"use client";
import React, { useEffect, useState } from "react";
import { useConfig } from "../context/ConfigContext";
import { useCleaningTrigger } from "../context/CleaningContext";
import { SelectComponent } from "../../components/form/SelectComponent";

import { Container } from "../../components/layout/Container";
import { Header } from "../../components/layout/Header";
import { Content } from "../../components/layout/Content";
import { ButtonContainer } from "src/components/button";
import { isEmpty } from "../utils/empty";

const optionsColors = [
  { type: "btn-blue", name: "Azul", color:"#3498DB" },
  { type: "btn-purple", name: "Roxo", color: "#9B59B6"},
  { type: "btn-green", name: "Verde", color: "#2ECC71" },
  { type: "btn-wood", name: "Marrom", color: "#8B5A2B" },
  { type: "btn-orange", name: "Laranja", color: "#FF9900" },
  { type: "btn-pink", name: "Rosa", color: "#E83E8C" },
  { type: "btn-black" , name: "Preto", color: "#2C2C2C" },
,
];

export default function Configuracao() {
  const { triggerCleaning } = useCleaningTrigger();
  const { _config } = useConfig();
  const [itemDefault, setItemDefault] = useState({ type: "", name: "", color: "#FF9900" });

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

  const handleColorButton = (value) => {
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
    const savedTheme = localStorage.getItem("theme");
    const themeButton = localStorage.getItem("theme-button");
    if (themeButton) {
      const colorCurrent = optionsColors.find((op) => op?.type === themeButton);

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
            <div className="flex gap-1 justify-center items-center">
              {optionsColors.map((op) => <div key={op.type} className={` rounded-full ${itemDefault?.type === op?.type ? 'border-2 border-[var(--text-default)]/30  p-1' : 'border-2 border-transparent p-1'}`}>
                <div 
                  onClick={() => handleColorButton(op)} 
                  className="w-5 h-5 rounded-full" style={{background: op.color}}>{}
                </div>
            </div>
            )}
          </div>
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
