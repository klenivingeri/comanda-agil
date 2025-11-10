"use client";

import { Container } from "../../../components/layout/Container";
import { Content } from "../../../components/layout/Content";
import { Header } from "../../../components/layout/Header";
import { Construction } from "../../../components/construction";

import { useCategory } from "src/app/context/CategoryContext";
export default function RelatorioPromocoes() {
  const { _category } = useCategory();

  return (
    <Container>
      <Header divider title="Relatório de Promoções" />
      <Content isLoading={_category.isLoading} error={_category.error}>
        <Construction />
      </Content>
    </Container>
  );
}