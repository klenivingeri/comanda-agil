"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Container } from "../../../components/layout/Container";
import { Header, HeaderGrid } from "../../../components/layout/Header";
import { IconDotMenu } from "../../../../public/icons/DotMenu";
import { Content } from "../../../components/layout/Content";
import { FormComponent } from "./FormComponent";
import { isEmpty } from "../../utils/empty";
import { IconBack } from "public/icons/ArrowBack";

export const CategoriaCadastrar = ({ categoryUUID }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(false);
  const router = useRouter();
  const goBack = () => {
    router.back();
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
      <Header h="h-[30px]">
        <HeaderGrid>
          <div className="col-span-2 flex" onClick={goBack}>
            <IconBack size="h-[26px] w-[26px]" />
          </div>

          <div className="col-span-8 mt-1">
            <div className="w-full flex justify-center">
              <span className="text-xs font-bold">CADASTRAR CATEGORIA</span>
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
