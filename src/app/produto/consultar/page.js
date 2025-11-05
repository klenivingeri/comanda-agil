"use client";
import React, { useState, useEffect } from "react";

import { Container } from "../../../components/layout/Container";
import { Content } from "../../../components/layout/Content";
import { Header } from "../../../components/layout/Header";
import { ItemList } from "src/components/itemList";
import { ButtonContainer } from "src/components/button";
import { IconDelete } from "public/icons/Delete";
import { IconEdit } from "public/icons/Edit";
import { Footer } from "src/components/layout/Footer";
import { ButtonCircle } from "src/components/button/ButtonCircle";

export default function ConsultarCategoria() {
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await fetch(`/api/items`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const resJSON = await res.json();
      setProducts(resJSON.records);
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (_id) => {
    const res = await fetch(`/api/items`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id }),
    });
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
      <Header
        divider
        setInputText={setInputText}
        title="Consultar funcionario"
      />
      <Content isLoading={isLoading} error={error} pb="pb-20" >
        <div className="flex flex-col gap-2">
          {products.map((product) => (
            <ItemList key={product._id} p="px-2">
              <p className="font-bold">{product.name}</p>
              <div className="flex gap-4">
                <ButtonContainer
                  style="buttonRed"
                  wFull="w-10"
                  hFull="h-9"
                  margin="mt-1"
                  onClick={() => handleDelete(product._id)}
                >
                  <IconDelete size="h-[20px] w-[20px]" />
                </ButtonContainer>
                <ButtonContainer
                  href={`/produto/cadastrar/${product._id}`}
                  wFull="w-10"
                  hFull="h-9"
                  margin="mt-1"
                >
                  <IconEdit size="h-[20px] w-[20px]" />
                </ButtonContainer>
              </div>
            </ItemList>
          ))}
        </div>
      </Content>
      <Footer bg="">
        <ButtonCircle href="/produto/cadastrar/create" />
      </Footer>
    </Container>
  );
}
