"use client";
import { useState } from "react";

import { IconDotMenu } from "public/icons/DotMenu";
import { MenuMobile } from "src/components/menu/lateral/MenuMobile";

import { Container } from "src/components/layout/Container";
import { Content } from "src/components/layout/Content";
import { Header, HeaderGrid } from "src/components/layout/Header";
import { Construction } from "src/components/construction";

export default function Perfil() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);

  const handleOpenMenuMobile = () => {
    setOpenMenuMobile(!openMenuMobile);
  };

  const handleFetch = async () => {
    const res = await fetch("/api/comandas/items", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <Container>
      <Header h="h-[40px]">
        <HeaderGrid>
          <div className="col-span-2 flex" onClick={handleOpenMenuMobile}>
            <IconDotMenu size="h-[32px] w-[32px]" />
          </div>

          <div className="col-span-8 flex items-center">
            <div className="w-full flex justify-center">
              <span className="text-md font-bold">Perfil</span>
            </div>
          </div>
          <div className="col-span-2"></div>
        </HeaderGrid>
      </Header>
      <div className="mt-[50px] mb-[50px] flex-1 flex flex-col">
        <Content isLoading={isLoading} error={error}>
          <button onClick={handleFetch}>busca</button>
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
