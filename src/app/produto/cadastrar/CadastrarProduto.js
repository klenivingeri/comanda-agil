"use client";
import { useEffect, useState } from "react";

import { Container } from "../../../components/layout/Container";
import { Header } from "../../../components/layout/Header";
import { IconDotMenu } from "../../../../public/icons/DotMenu";
import { MenuMobile } from "../../../components/menu/lateral/MenuMobile";
import { Content } from "../../../components/layout/Content";
import { FormComponent } from "./FormComponent";

const Input = () => {};

export const ProdutoCadastrar = ({ productUUID }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [typeItems, setTypeItems] = useState([]);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);

  const criarComanda = async () => {
    const res = await fetch(`/api/items?id=test`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const itemsDaComanda = await res.json();

    setItems(itemsDaComanda);
    setIsLoading(false);
  };

  const handleOpenMenuMobile = () => {
    setOpenMenuMobile(!openMenuMobile);
  };

  const handleCreateComanda = () => {
    criarComanda();
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
        <div className="flex flex-col w-full gap-2 justify-start">
          <div className="w-full grid grid-cols-12 px-2 h-[40px]">
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
          </div>
        </div>
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
