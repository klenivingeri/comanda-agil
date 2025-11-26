"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Container } from "../../../components/layout/Container";
import { Content } from "../../../components/layout/Content";
import { Header } from "../../../components/layout/Header";
import { Tabs } from "src/components/Tabs";

import { Ranking } from "src/components/Ranking";
import { DashboardMultipleLine } from "src/components/ChartComponents/DashboardMultipleLine";
import { CORES_FIXAS } from "src/app/utils/constants";
import { last7days } from "src/app/utils/last7days";
import { Loading } from "src/components/loading/Loading";

const arrTabs = [
  { title: 'Dia', id: 'day' },
  { title: 'Semana', id: 'week' },
  { title: 'Mês', id: 'month' }
]

const ConfigRanking = ({ allSubOrders, tab }) => {

  const groupedSubOrdersForChart = useMemo(() => {
    if (!allSubOrders?.length) return [];
    if (tab === "day") {
      return Object.values(
        allSubOrders.reduce((acc, item) => {
          const key = item.userId?._id;
          console.log(item.userId.name)
          if (!key) return acc;

          if (!acc[key]) {
            acc[key] = {
              key,
              totalQuantity: 0,
              category: item.product?.category || null,
              product: item.product || null,
              createdAt: item.createdAt || null,
              displayName: item.userId?.name || "Nome de usuário desconhecido",
            };
          }

          acc[key].totalQuantity += item.quantity || 0;

          return acc;
        }, {})
      );
    }

    const acc = allSubOrders.reduce((acc, item) => {
      const key = item.userId?._id;
      if (!key) return acc;

      // 🔹 valida createdAt antes
      if (!item.createdAt) return acc;

      const dateObj = new Date(item.createdAt);
      if (isNaN(dateObj.getTime())) return acc; // ignora datas inválidas

      const data = dateObj.toISOString().split("T")[0];

      if (!acc[key]) {
        acc[key] = {
          key,
          totalQuantity: 0,
          category: item.product?.category || null,
          product: item.product || null,
          datas: {},
          dataMaisFrequente: data,
          max: 0,
          displayName: item.userId?.name || "Nome de usuário desconhecido",
        };
      }

      acc[key].totalQuantity += item.quantity || 0;
      acc[key].datas[data] = (acc[key].datas[data] || 0) + 1;

      if (acc[key].datas[data] > acc[key].max) {
        acc[key].max = acc[key].datas[data];
        acc[key].dataMaisFrequente = data;
      }

      return acc;
    }, {});

    return Object.values(acc).map(({ datas, max, dataMaisFrequente, ...rest }) => ({
      ...rest,
      createdAt: dataMaisFrequente,
    }));
  }, [allSubOrders, tab]);

  const sortSuborders = useMemo(() => {
    return [...groupedSubOrdersForChart].sort((a, b) => b.totalQuantity - a.totalQuantity);
  }, [groupedSubOrdersForChart]);

  const colorsMap = useMemo(() => {
    return sortSuborders.reduce((acc, item, i) => {
      const colorIndex = i % CORES_FIXAS.length;
      acc[item.displayName] = CORES_FIXAS[colorIndex];

      return acc;
    }, {});
  }, [sortSuborders]);

  return (
    <>
      <DashboardMultipleLine allSubOrders={allSubOrders} tab={tab} colorsMap={colorsMap} type="collaborators" />
      <div className=" flex justify-center">Quantidade de itens adicionados nas comandas.</div>
      <Ranking data={sortSuborders} colorsMap={colorsMap} />
    </>)
}

export default function RelatorioCategoriaView({ getCategoryItems, response, isLoading, error }) {
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

  const LabelText = {
    day: 'Atividade de colaboradores nas últimas 24h',
    week: 'Atividade de colaboradores nos últimos 7 dias',
    month: 'Atividade de colaboradores nos últimos 30 dias',
  }
  console.log(response)
  return (
    <Container>
      <Header divider title="Relatório de colaboradores" />
      <Content>
        <Tabs tabs={arrTabs} value={tab} setValue={setTab} />
        <h2 className="mt-5" style={{ textAlign: "center" }}>
          {LabelText[tab]}
        </h2>
        {allSubOrders.length === 0
          ? (
            isLoading
              ? <Loading isLoading={isLoading} />
              : <div className="flex justify-center items-center h-[350px] m-2">
                <div>Nenhum dado encontrado no momento.</div>
              </div>
          )
          : <ConfigRanking allSubOrders={allSubOrders} tab={tab} />
        }
      </Content>
    </Container>
  );
}
