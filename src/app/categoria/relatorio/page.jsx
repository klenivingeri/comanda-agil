"use client";
import React, { useEffect, useState } from "react";
import { Container } from "../../../components/layout/Container";
import { Content } from "../../../components/layout/Content";
import { Header } from "../../../components/layout/Header";
import { Tabs } from "src/components/Tabs";
import { ChartContent } from "src/components/ChartComponents";

const arrTabs = [
  {title: 'Dia', id: 'dia'},
  {title: 'Semana', id: 'semana'},
  {title: 'Mês', id: 'mes'}
]

const Ranking = ({ data }) => {
  return null
};

export default function RelatorioCategoria() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [tab, setTab] = useState('dia');

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
        <Tabs tabs={arrTabs} value={tab} setValue={setTab} />
        <div className="relative rounded-md flex justify-center items-center h-[350px] m-2">
          <ChartContent dataRecords={response} type='rosca' />
          
        </div>
        <Ranking data={response} />
      </Content>
    </Container>
  );
}
