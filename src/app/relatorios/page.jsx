"use client";
import React, { useState } from "react";
import RelatorioView from "./RelatorioView";
import { getAllIndexdbOrApi } from "src/db/getIndexdbOrApi";

export default function PageRelatorioProduto() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState([]);

  const handlegetIndexdbOrApi = (period) => {
    getAllIndexdbOrApi({
      endpoint: `/api/data`,
      period,
      setResponse,
      setIsLoading,
      setError,
    })
  }

  return (
    <RelatorioView
      error={error}
      isLoading={isLoading}
      response={response}
      getCategoryItems={handlegetIndexdbOrApi}
    />
  );
}
