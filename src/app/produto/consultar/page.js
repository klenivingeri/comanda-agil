"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconDotMenu } from "../../../../public/icons/DotMenu";
import { MenuMobile } from "../../../components/menu/lateral/MenuMobile";

import { Container } from "../../../components/layout/Container";
import { Content } from "../../../components/layout/Content";
import { Header, HeaderGrid } from "../../../components/layout/Header";
import { InputSearch } from "../../../components/input/inputSearch";
import { isEmpty } from "src/app/utils/empty";
import { ItemList } from "src/components/itemList";
import { Button } from "src/components/button/Button";
import { IconDelete } from "public/icons/Delete";
import { IconEdit } from "public/icons/Edit";
import { IconBack } from "public/icons/ArrowBack";

export default function ConsultarCategoria() {
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

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
      <Header h="h-[40px]">
        <HeaderGrid>
          <div className="col-span-2 flex" onClick={goBack}>
            <IconBack size="h-[32px] w-[32px]" />
          </div>

          <div className="col-span-8 flex items-center">
            <div className="w-full flex justify-center">
              <span className="text-md font-bold">Consultar Funcionario</span>
            </div>
          </div>
          <div className="col-span-2"></div>
        </HeaderGrid>
        <HeaderGrid>
          <div className="relative col-span-12 flex items-end gap-2">
            <InputSearch setInputText={setInputText} />
          </div>
        </HeaderGrid>
      </Header>
      <div className="mt-[100px] mb-[60px] flex-1 flex flex-col">
        <Content isLoading={isLoading} error={error}>
          <div className="flex flex-col gap-2">
            {products.map((product) => (
              <ItemList key={product._id} p="px-2">
                <p className="font-bold">{product.name}</p>
                <div className="flex gap-4">
                  <Button
                    style="buttonRed"
                    wFull="w-10"
                    hFull="h-9"
                    margin="mt-1"
                    onClick={() => handleDelete(product._id)}
                  >
                    <IconDelete size="h-[20px] w-[20px]" />
                  </Button>
                  <Button
                    href={`/produto/cadastrar/${product._id}`}
                    wFull="w-10"
                    hFull="h-9"
                    margin="mt-1"
                  >
                    <IconEdit size="h-[20px] w-[20px]" />
                  </Button>
                </div>
              </ItemList>
            ))}
          </div>
        </Content>
      </div>
    </Container>
  );
}
