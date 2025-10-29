"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Container } from "../../../components/layout/Container";
import { Content } from "../../../components/layout/Content";
import { Header } from "../../../components/layout/Header";
import { Tabs } from "src/components/Tabs";
import { ChartContent } from "src/components/ChartComponents";
import { Ranking } from "src/components/Ranking";

const arrTabs = [
  { title: 'Dia', id: 'day' },
  { title: 'Semana', id: 'week' },
  { title: 'Mês', id: 'month' }
]

export default function RelatorioProductsView({ getCategoryItems, response, isLoading, error }) {
  const [tab, setTab] = useState('day');

  useEffect(() => {
    getCategoryItems(tab)
  }, [tab])

  const orderData = useMemo(() => {
    return [...response].sort((a, b) => b.totalQuantity - a.totalQuantity);
  }, [response]);

  return (
    <Container>
      <Header divider title="Relatório de Products" />
      <Content isLoading={isLoading} error={error}>
        <Tabs tabs={arrTabs} value={tab} setValue={setTab} />
        {response.length === 0
          ? (
            <div className="flex justify-center items-center h-[350px] m-2">
              <div>Nenhum dado encontrado no momento.</div>
            </div>
          )
          : (<>
            <div className="relative rounded-md flex justify-center items-center h-[350px] m-2">
              <ChartContent dataRecords={orderData} type='rosca' />
            </div>
            <Ranking data={orderData} />
          </>
          )
        }
      </Content>
    </Container>
  );
}
