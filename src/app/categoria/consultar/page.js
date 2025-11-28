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
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const getCategoryItems = async () => {
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
    const res = await fetch(`/api/category`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id }),
    });
    getCategoryItems();
  };

  useEffect(() => {
    setIsLoading(true);
    getCategoryItems();
  }, []);

  return (
    <Container>
      <Header divider setInputText={setInputText} title="Consultar Categoria" />
      <Content isLoading={isLoading} error={error} pb="pb-20">
        <div className="flex flex-col gap-2">
          {categories?.map((category) => (
            <ItemList key={category._id} p="px-2">
              <p className="font-bold">{category.name}</p>
              <div className="flex gap-4">
                <ButtonContainer
                  style="buttonRed"
                  wFull="w-10"
                  hFull="h-9"
                  margin="mt-1"
                  onClick={() => handleDelete(category._id)}
                >
                  <IconDelete size="h-[20px] w-[20px]" />
                </ButtonContainer>
                <ButtonContainer
                  href={`/categoria/cadastrar/${category._id}`}
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
        <ButtonCircle href="/categoria/cadastrar/create" />
      </Footer>
    </Container>
  );
}
