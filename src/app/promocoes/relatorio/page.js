"use client";

import { Container } from "../../../components/layout/Container";
import { Content } from "../../../components/layout/Content";
import { Header } from "../../../components/layout/Header";
import { Construction } from "../../../components/construction";

export default function RelatorioPromocoes() {

  return (
    <Container>
      <Header divider title="Relatório de Promoções" />
      <Content>
        <Construction />
      </Content>
    </Container>
  );
}