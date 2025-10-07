"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Container } from "src/components/layout/Container";
import { Content } from "src/components/layout/Content";
import { Header, HeaderGrid } from "src/components/layout/Header";
import { Construction } from "src/components/construction";
import { IconBack } from "public/icons/ArrowBack";

export default function Perfil() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const router = useRouter();
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
      <Header h="h-[30px]">
        <HeaderGrid>
          <div className="col-span-2 flex" onClick={() => router.back()}>
            <IconBack size="h-[26px] w-[26px]" />
          </div>

          <div className="col-span-8 mt-1">
            <div className="w-full flex justify-center">
              <span className="text-xs font-bold">PERFIL</span>
            </div>
          </div>
          <div className="col-span-2"></div>
        </HeaderGrid>
      </Header>
      <div className="mt-[30px] mb-[50px] flex-1 flex flex-col">
        <Content isLoading={isLoading} error={error}>
          <button onClick={handleFetch}>busca</button>
          <Construction />
        </Content>
      </div>
    </Container>
  );
}
