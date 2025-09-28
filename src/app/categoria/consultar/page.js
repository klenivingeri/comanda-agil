"use client";
import React, { useState, useEffect } from "react";

import { IconDotMenu } from "../../../../public/icons/DotMenu";
import { MenuMobile } from "../../../components/menu/lateral/MenuMobile";

import { Container } from "../../../components/layout/Container";
import { Content } from "../../../components/layout/Content";
import { Header, HeaderGrid } from "../../../components/layout/Header";
import { Construction } from "../../../components/construction";
import { InputSearch } from "../../../components/input/inputSearch";
import { isEmpty } from "src/app/utils/empty";

export default function ConsultarCategoria() {
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);

  const handleOpenMenuMobile = () => {
    setOpenMenuMobile(!openMenuMobile);
  };

  useEffect(() => {
    const getCategoryItems = async () => {
      const res = await fetch(`/api/category`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const resJSON = await res.json();

      if (isEmpty(resJSON.records)) {
        setIsLoading(false);
        return;
      }

      setCategories(resJSON.records);
      setIsLoading(false);
    };

    getCategoryItems();
    setIsLoading(false);
  }, []);

  return (
    <Container>
      <Header h="h-[40px]">
        <HeaderGrid>
          <div className="col-span-2 flex" onClick={handleOpenMenuMobile}>
            <IconDotMenu size="h-[32px] w-[32px]" />
          </div>

          <div className="col-span-8 flex items-center">
            <div className="w-full flex justify-center">
              <span className="text-md font-bold">Consultar Funcionario</span>
            </div>
          </div>
          <div className="col-span-2"></div>
        </HeaderGrid>
        <HeaderGrid>
          <div className="relative col-span-12 flex items-end gap-2">
            <InputSearch setInputText={setInputText} />
          </div>
        </HeaderGrid>
      </Header>
      <div className="mt-[100px] mb-[60px] flex-1 flex flex-col">
        <Content isLoading={isLoading} error={error}>
          <div className="flex py-2 px-4 h-14 content-center bg-[var(--bg-component)] justify-between border-2 border-[var(--bg-subTitle)] border-l-4 rounded-md shadow-lg shadow-[var(--bg-subTitle)]/50"></div>
        </Content>
      </div>
      <MenuMobile
        handleOpenModal={handleOpenMenuMobile}
        openModal={openMenuMobile}
      />
    </Container>
  );
}
