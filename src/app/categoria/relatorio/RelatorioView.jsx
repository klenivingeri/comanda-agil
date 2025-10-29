"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Container } from "../../../components/layout/Container";
import { Content } from "../../../components/layout/Content";
import { Header } from "../../../components/layout/Header";
import { Tabs } from "src/components/Tabs";
import { ChartContent } from "src/components/ChartComponents";
import { CORES_FIXAS } from "src/app/utils/constants";

const arrTabs = [
  { title: 'Dia', id: 'day' },
  { title: 'Semana', id: 'week' },
  { title: 'Mês', id: 'month' }
]

const Ranking = ({ data }) => {
  return data.map((category, i) => (
    <div
      key={i}
      className="grid grid-cols-12 mb-2 opacity-0 animate-fade-in"
      style={{
        animationDelay: `${i * 0.1}s`, // ⏱️ cada item atrasa 0.2s a mais
        animationFillMode: "forwards",
      }}
    >
      <div className="flex col-span-4 justify-end items-center mr-2 whitespace-nowrap">
        {category.name}
      </div>
      <div className="col-span-7">
        <div
          className="rounded-r-full transition-all duration-700 ease-out"
          style={{
            background: CORES_FIXAS[i],
            width: `${(category.totalQuantity / data[0].totalQuantity) * 100}%`,
            minWidth: "fit-content",
          }}
        >
          <div className="whitespace-nowrap px-2">{category.totalQuantity}</div>
        </div>
      </div>
    </div>
  ));
};


export default function RelatorioCategoriaView({ getCategoryItems, response, isLoading, error }) {
  const [tab, setTab] = useState('day');

  useEffect(() => {
    getCategoryItems(tab)
  }, [tab])

  const orderData = useMemo(() => {
    return [...response].sort((a, b) => b.totalQuantity - a.totalQuantity);
  }, [response]);


  return (
    <Container>
      <Header divider title="Relatório de categoria" />
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
