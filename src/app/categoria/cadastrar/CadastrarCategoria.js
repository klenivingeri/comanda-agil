"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Container } from "../../../components/layout/Container";
import { Header, HeaderGrid } from "../../../components/layout/Header";
import { IconDotMenu } from "../../../../public/icons/DotMenu";
import { Content } from "../../../components/layout/Content";
import { FormComponent } from "./FormComponent";
import { isEmpty } from "../../utils/empty";

export const CategoriaCadastrar = ({ categoryUUID }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleOpenMenuMobile = () => {
    setOpenMenuMobile(!openMenuMobile);
  };

  const getCategoryItems = async (categoryUUID) => {
    const res = await fetch(`/api/category?id=${categoryUUID}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const resJSON = await res.json();

    if (isEmpty(resJSON.records)) {
      setIsLoading(false);
      return;
    }

    setCategory(resJSON.records);
    setIsLoading(false);
  };

  useEffect(() => {
    if (categoryUUID !== "create") {
      getCategoryItems(categoryUUID);
    }
    setIsLoading(false);
  }, []);

  return (
    <Container>
      <Header h="h-[40px]">
        <HeaderGrid>
          <div className="col-span-2 flex" onClick={() => router.back()}>
            <IconDotMenu size="h-[32px] w-[32px]" />
          </div>

          <div className="col-span-8 flex items-center">
            <div className="w-full flex justify-center">
              <span className="text-md font-bold">Cadastrar Categoria</span>
            </div>
          </div>
          <div className="col-span-2"></div>
        </HeaderGrid>
      </Header>
      <div className="mt-[50px] mb-[50px] flex-1 flex flex-col">
        <Content isLoading={isLoading} error={error}>
          <FormComponent category={category} />
        </Content>
      </div>
    </Container>
  );
};
