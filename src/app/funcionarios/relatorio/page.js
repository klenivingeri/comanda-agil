"use client";
import { useState } from "react";

import { Container } from "../../../components/layout/Container";
import { Content } from "../../../components/layout/Content";
import { Header } from "../../../components/layout/Header";
import { Construction } from "../../../components/construction";

export default function RelatorioFuncionario() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Container>
      <Header divider title="Relatório de funcionario" />
        <Content isLoading={isLoading} error={error}>
          <Construction />
        </Content>
    </Container>
  );
}
