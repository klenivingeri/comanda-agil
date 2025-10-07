"use client";
import { useState } from "react";

import { IconDotMenu } from "../../../../public/icons/DotMenu";
import { MenuMobile } from "../../../components/menu/lateral/MenuMobile";

import { Container } from "../../../components/layout/Container";
import { Content } from "../../../components/layout/Content";
import { Header, HeaderGrid } from "../../../components/layout/Header";
import { Construction } from "../../../components/construction";

export default function RelatorioProdutos() {
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

          <div className="col-span-8 mt-1">
            <div className="w-full flex justify-center">
              <span className="text-xs font-bold">RELATÓRIO DE PROMOÇÕES</span>
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
      <MenuMobile
        handleOpenModal={handleOpenMenuMobile}
        openModal={openMenuMobile}
      />
    </Container>
  );
}
