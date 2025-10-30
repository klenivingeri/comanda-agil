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

export default function RelatorioCategoriaView({ getCategoryItems, response, isLoading, error }) {
  const [tab, setTab] = useState('day');

  useEffect(() => {
    getCategoryItems(tab)
  }, [tab])

  const allSubOrders = useMemo(
    () => response.flatMap(order => order.subOrders || []),
    [response]
  );

const groupedSubOrdersForID = useMemo(() => {
  if (!allSubOrders?.length) return [];

  return Object.values(
    allSubOrders.reduce((acc, item) => {
      const type = item.product?.category?.type;
      if (!type) return acc;

      if (!acc[type]) {
        acc[type] = {
          categoryType: type,
          totalQuantity: 0,
          category: item.product?.category,
        };
      }

      acc[type].totalQuantity += item.quantity || 0;
      return acc;
    }, {})
  );
}, [allSubOrders]);

  const sortSuborders = useMemo(() => {
    return [...groupedSubOrdersForID].sort((a, b) => b.totalQuantity - a.totalQuantity);
  }, [groupedSubOrdersForID]);
  
  return (
    <Container>
      <Header divider title="Relatório de categoria" />
      <Content isLoading={isLoading} error={error}>
        <Tabs tabs={arrTabs} value={tab} setValue={setTab} />
        {allSubOrders.length === 0
          ? (
            <div className="flex justify-center items-center h-[350px] m-2">
              <div>Nenhum dado encontrado no momento.</div>
            </div>
          )
          : <Ranking data={sortSuborders} />
        }
      </Content>
    </Container>
  );
}
