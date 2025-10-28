"use client";
import React, { useState } from "react";
import RelatorioCategoriaView from "./RelatorioView";
import { getIndexdbOrApi } from "src/db/getIndexdbOrApi";

const Ranking = ({ data }) => {
  return data.map((category, i) => {

    return (
      <div key={i}>{category.name}</div>
    )
  })
};

export default function PageRelatorioCategoria() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState([]);

  const handlegetIndexdbOrApi = (period) => {
    getIndexdbOrApi({
      endpoint: `/api/comandas/reports/categories`,
      period,
      setResponse,
      setIsLoading,
      setError,
    })
  }

  return (
    <RelatorioCategoriaView
      error={error}
      isLoading={isLoading}
      response={response}
      getCategoryItems={handlegetIndexdbOrApi}
    />
  );
}
