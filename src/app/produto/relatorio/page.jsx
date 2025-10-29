"use client";
import React, { useEffect, useState } from "react";
import RelatorioProductsView from "./RelatorioView";
import { getIndexdbOrApi } from "src/db/getIndexdbOrApi";

export default function PageRelatorioProduto() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState([]);


  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(`/api/data?tenant=68d91f4544b1a2f9911f1403`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const resJSON = await res.json();
      } catch (_) {
      } finally {
      }
    };
    getProducts()
  }, [])



  const handlegetIndexdbOrApi = (period) => {
    getIndexdbOrApi({
      name: 'products',
      endpoint: `/api/comandas/reports/products`,
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
