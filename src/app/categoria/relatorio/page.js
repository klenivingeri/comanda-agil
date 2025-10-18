"use client";
import { useState } from "react";

import { IconDotMenu } from "../../../../public/icons/DotMenu";
import { MenuMobileContainer } from "../../../components/menu/lateral";

import { Container } from "../../../components/layout/Container";
import { Content } from "../../../components/layout/Content";
import { Header, HeaderGrid } from "../../../components/layout/Header";
import { Construction } from "../../../components/construction";

export default function RelatorioCategoria() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);

  const handleOpenMenuMobile = () => {
    setOpenMenuMobile(!openMenuMobile);
  };

  return (
    <Container>
      <Header h="h-[30px]">
        <HeaderGrid>
          <div className="col-span-2 flex" onClick={handleOpenMenuMobile}>
            <IconDotMenu size="h-[32px] w-[32px]" />
          </div>

          <div className="col-span-8 flex items-center">
            <div className="w-full flex justify-center">
              <span className="text-XS font-bold">RELATÓRIO DE CATEGORIA</span>
            </div>
          </div>
          <div className="col-span-2"></div>
        </HeaderGrid>
      </Header>
      <div className="mt-[30px] mb-[50px] flex-1 flex flex-col">
        <Content isLoading={isLoading} error={error}>
          <Construction />
        </Content>
      </div>
      <MenuMobileContainer
        handleOpenModal={handleOpenMenuMobile}
        openModal={openMenuMobile}
      />
    </Container>
  );
}
