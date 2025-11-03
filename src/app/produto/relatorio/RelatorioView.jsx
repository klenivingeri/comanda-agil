"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Container } from "../../../components/layout/Container";
import { Content } from "../../../components/layout/Content";
import { Header } from "../../../components/layout/Header";
import { Tabs } from "src/components/Tabs";

import { Ranking } from "src/components/Ranking";
import { DashboardOneLine } from "src/components/ChartComponents/DashboardOneLine";

const arrTabs = [
  { title: 'Dia', id: 'day' },
  { title: 'Semana', id: 'week' },
  { title: 'Mês', id: 'month' }
]

function last7days(allSuborders) {
  const dateCurrent = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(dateCurrent.getDate() - 7);

  return allSuborders.filter(item => {
    const data = new Date(item.createdAt);
    return data >= lastWeek && data <= dateCurrent;
  });
}

export default function RelatorioProductsView({ getCategoryItems, response, isLoading, error }) {
  const [tab, setTab] = useState('day');

  useEffect(() => {
    getCategoryItems(tab)
  }, [tab])

  const allSubOrders = useMemo(() => {
    const all = response.flatMap(order => order.subOrders || []);
    const period = {
      day: all,
      week: last7days(all),
      month: all,
    }

    return period[tab];
  }, [response, tab]);

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


  const LabelText = {
    day: 'Produtos pedidos nas últimas 24h',
    week: 'Produtos pedidos nos últimos 7 dias',
    month: 'Produtos pedidos nos últimos 30 dias',
  }

  return (
    <Container>
      <Header divider title="Relatório de Products" />
      <Content isLoading={isLoading} error={error}>
        <Tabs tabs={arrTabs} value={tab} setValue={setTab} />
        <h2 className="mt-5" style={{ textAlign: "center" }}>
          {LabelText[tab]}
        </h2>
        <DashboardOneLine allSubOrders={allSubOrders} tab={tab} />
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
