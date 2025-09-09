"use client";
import { useEffect, useState } from "react";

import { Container } from "../../../components/layout/Container";
import { Header, HeaderGrid } from "../../../components/layout/Header";
import { IconDotMenu } from "../../../../public/icons/DotMenu";
import { MenuMobile } from "../../../components/menu/lateral/MenuMobile";
import { Content } from "../../../components/layout/Content";
import { FormComponent } from "./FormComponent";

export const ProdutoCadastrar = ({ productUUID }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [typeItems, setTypeItems] = useState([]);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);

  const handleOpenMenuMobile = () => {
    setOpenMenuMobile(!openMenuMobile);
  };

  const getTypeItems = async () => {
    const res = await fetch(`/api/type-items`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const typeItems = await res.json();
    setTypeItems(typeItems.records);
    setIsLoading(false);
  };

  useEffect(() => {
    getTypeItems(isLoading);
  }, []);

  return (
    <Container>
      <Header h="h-[40px]">
        <HeaderGrid>
          <div className="col-span-2"></div>
          <div className="col-span-8 flex items-center">
            <div className="w-full flex justify-center">
              <span className="text-md font-bold">Cadastrar Produto</span>
            </div>
          </div>
          <div
            className="col-span-2 flex items-end justify-end pt-1"
            onClick={handleOpenMenuMobile}
          >
            <IconDotMenu size="h-[32px] w-[32px]" />
          </div>
        </HeaderGrid>
      </Header>
      <div className="mt-[50px] mb-[50px] flex-1 flex flex-col">
        <Content isLoading={isLoading}>
          <FormComponent typeItems={typeItems} />
        </Content>
      </div>
      <MenuMobile
        handleOpenModal={handleOpenMenuMobile}
        openModal={openMenuMobile}
      />
    </Container>
  );
};
