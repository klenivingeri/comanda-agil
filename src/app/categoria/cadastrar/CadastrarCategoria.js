"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "../../../components/layout/Container";
import { Header } from "../../../components/layout/Header";
import { Content } from "../../../components/layout/Content";
import { FormComponentCategory } from "./FormComponentCategory";
import { isEmpty } from "../../utils/empty";

export const CategoriaCadastrar = ({ categoryUUID }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(false);
  const router = useRouter();

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

  const title = `${categoryUUID !== "create"  ? "Editar" : "Cadastrar" } Categoria`

  return (
    <Container>
      <Header divNew divider title={title} />
      <Content isLoading={isLoading} error={error}>
        <FormComponentCategory category={category} title={title} />
      </Content>
    </Container>
  );
};
