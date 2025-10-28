"use client";
import React, { useEffect, useState } from "react";
import { Container } from "../../../components/layout/Container";
import { Content } from "../../../components/layout/Content";
import { Header } from "../../../components/layout/Header";
import { Tabs } from "src/components/Tabs";
import { ChartContent } from "src/components/ChartComponents";

const arrTabs = [
  { title: 'Dia', id: 'day' },
  { title: 'Semana', id: 'categoriesWeek' },
  { title: 'Mês', id: 'categoriesMonth' }
]

const Ranking = ({ data }) => {
  return data.map((category, i) => {

    return (
      <div key={i}>{category.name}</div>
    )
  })
};

export default function RelatorioCategoriaView({ getCategoryItems, response, isLoading, error }) {
  const [tab, setTab] = useState('day');

  useEffect(() => {
    getCategoryItems(tab)
  }, [tab])

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
              <ChartContent dataRecords={response} type='rosca' />
            </div>
            <Ranking data={response} />
            </>
            )
        }
      </Content>
    </Container>
  );
}
