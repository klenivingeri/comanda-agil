"use client";
import React, { useState } from "react";
import RelatorioProductsView from "./RelatorioView";
import { getAllIndexdbOrApi } from "src/db/getIndexdbOrApi";
import { useUserConfig } from "src/app/context/UserContext";

export default function PageRelatorioProduto() {
  const { _user } = useUserConfig();
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
    <RelatorioProductsView
      error={error}
      isLoading={isLoading}
      response={response}
      getCategoryItems={handlegetIndexdbOrApi}
    />
  );
}
