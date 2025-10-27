"use client";
import { useEffect, useState } from "react";
import { Container } from "../../../components/layout/Container";
import { Content } from "../../../components/layout/Content";
import { Header } from "../../../components/layout/Header";
import { Construction } from "../../../components/construction";

export default function RelatorioCategoria() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(false);

  const getCategoryItems = async () => {
    try {
      const res = await fetch(`/api/comandas/reports/categories`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const resJSON = await res.json();
      setResponse(resJSON.records);
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategoryItems();
  }, [])

  return (
    <Container>
      <Header divider title="Relatório de categoria" />
      <Content isLoading={isLoading} error={error}>
        <Construction />
        <div>
          <div>Dia</div>
          <div>Semana</div>
          <div>Mês</div>
        </div>
      </Content>
    </Container>
  );
}
