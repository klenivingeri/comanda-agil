"use client";
import React, { useState } from "react";
import RelatorioCategoriaView from "./RelatorioView";
import { getIndexdbOrApi } from "src/db/getIndexdbOrApi";

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
