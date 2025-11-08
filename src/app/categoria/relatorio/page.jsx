"use client";
import React, { useEffect, useState } from "react";
import RelatorioCategoriaView from "./RelatorioView";
import { getAllIndexdbOrApi } from "src/db/getIndexdbOrApi";

export default function PageRelatorioCategoria() {
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
    <RelatorioCategoriaView
      error={error}
      isLoading={isLoading}
      response={response}
      getCategoryItems={handlegetIndexdbOrApi}
    />
  );
}
