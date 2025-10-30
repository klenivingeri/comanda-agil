"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Container } from "../../../components/layout/Container";
import { Content } from "../../../components/layout/Content";
import { Header } from "../../../components/layout/Header";
import { Tabs } from "src/components/Tabs";
import { ChartContent } from "src/components/ChartComponents";
import { Ranking } from "src/components/Ranking";
import DashboardOneLine from "src/components/ChartComponents/DashboardOneLine";
import DashboardMultipleLine from "src/components/ChartComponents/DashboardMultipleLine";

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

  const allSubOrders = useMemo(
    () => response.flatMap(order => order.subOrders || []),
    [response]
  );

  const groupedSubOrdersForID = useMemo(() => {
  return Object.values(
    allSubOrders.reduce((acc, item) => {
      const id = item.product?._id || item._id;
      if (!id) return acc;

      if (!acc[id]) {
        acc[id] = { _id: id, totalQuantity: 0, product: item.product, createdAt: item.createdAt };
      }

      acc[id].totalQuantity += item.quantity || 0;
      return acc;
    }, {})
  );
}, [allSubOrders]);

  const sortSuborders = useMemo(() => {
    return [...groupedSubOrdersForID].sort((a, b) => b.totalQuantity - a.totalQuantity);
  }, [groupedSubOrdersForID]);

  return (
    <Container>
      <Header divider title="Relatório de Products" />
      <Content isLoading={isLoading} error={error}>
        <Tabs tabs={arrTabs} value={tab} setValue={setTab} />
        <DashboardOneLine allSubOrders={allSubOrders} isDay={tab === 'day'} />
        <DashboardMultipleLine allSubOrders={sortSuborders} isDay={tab === 'day'} />
        {response.length === 0
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
