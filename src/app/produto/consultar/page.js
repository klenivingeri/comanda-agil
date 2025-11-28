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
import { ItemLists } from "src/app/atendimento/ItemLists";
import { serializerProduct } from "src/db/getIndexdbOrApi";

export default function ConsultarCategoria() {
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState(false);
  const [openType, setOpenType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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

  const getCategory = async () => {
    try {
      const res = await fetch(`/api/category`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const resJSON = await res.json();
      setCategories(resJSON.records);
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

  const productWithCategory = serializerProduct({
    catalog_products: products,
    catalog_categories: categories,
  });

  useEffect(() => {
    getProducts();
    getCategory();
  }, []);

  return (
    <Container>
      <Header
        divider
        setInputText={setInputText}
        title="Consultar Produto"
      />
      <Content isLoading={isLoading} error={error} pb="pb-28">
        <div className="flex flex-col gap-2">
          <ItemLists
            items={productWithCategory}
            _category={{all: categories}}
            inputText=""
            handleUpdateItemsSelected={() => {}}
            openModal={() => {}}
            openType={openType}
            setOpenType={setOpenType}
            isEdit
            handleDelete={handleDelete}
          />
        </div>
      </Content>
      <Footer bg="">
        <ButtonCircle href="/produto/cadastrar/create" />
      </Footer>
    </Container>
  );
}
