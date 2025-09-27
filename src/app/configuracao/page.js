"use client";
import React, { useEffect, useState } from "react";

import { SelectComponent } from "../../components/form/SelectComponent";
import { Loading } from "../../components/loading/Loading";
import { Button } from "../../components/button/Button";

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
  const [isLoading, setIsLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({});
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [error, setError] = useState(false);

  const handleButtonColor = (color) => {
    const root = window.document.documentElement;
    const colorCurrent = root.classList.value;

    for (const option of optionsColors) {
      if (colorCurrent.includes(option.type)) {
        root.classList.remove(option.type);
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

  const handleFormDetails = (id, value) => {
    setFormDetails({ ...formDetails, [id]: value });
  };

  const handleSend = async () => {
    const allFilled = Object.values(formDetails).every((value) => {
      if (value.name) {
        return value.name && value.name !== "seleted";
      }
      return value && value !== "seleted";
    });

    handleButtonColor(formDetails.colors.type);
    if (!allFilled) {
    }
  };

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

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
            <SelectComponent
              id="colors"
              value={formDetails?.colors}
              setValue={handleFormDetails}
              label="Selecione a cor padrão"
              required
              itemDefault="Selecione a cor padrão"
              options={optionsColors}
            />

            <div className="flex justify-center items-center w-full">
              <div className="relative w-full flex justify-center items-center">
                <Button onClick={handleSend} text="Cadastrar Produto" />
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
