"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { IconDotMenu } from "../../../../public/icons/DotMenu";
import { MenuMobileContainer } from "../../../components/menu/lateral";
import { Container } from "../../../components/layout/Container";
import { Content } from "../../../components/layout/Content";
import { Header, HeaderGrid } from "../../../components/layout/Header";
import { InputSearch } from "../../../components/input/inputSearch";
import { ItemList } from "src/components/itemList";
import { ButtonContainer } from "src/components/button";
import { IconDelete } from "public/icons/Delete";
import { IconEdit } from "public/icons/Edit";
import { IconBack } from "public/icons/ArrowBack";

export default function ConsultarCategoria() {
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const handleOpenMenuMobile = () => {
    setOpenMenuMobile(!openMenuMobile);
  };

  const getUsers = async () => {
    try {
      const res = await fetch(`/api/user`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const resJSON = await res.json();
      setUsers(resJSON.records);
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (_id) => {
    const res = await fetch(`/api/user`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id }),
    });
    getUsers();
  };

  useEffect(() => {
    setIsLoading(true);
    getUsers();
  }, []);

  return (
    <Container>
      <Header h="h-[40px]">
        <HeaderGrid>
          <div className="col-span-2 flex" onClick={goBack}>
            <IconBack size="h-[26px] w-[26px]" />
          </div>

          <div className="col-span-8 MT-1">
            <div className="w-full flex justify-center">
              <span className="text-xs font-bold">CONSULTAR FUNCIONARIO</span>
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
        <Content isLoading={isLoading} error={error} margin="mt-[100px] mb-[60px]">
          <div className="flex flex-col gap-2">
            {users?.map((user) => (
              <ItemList key={user._id} p="px-2">
                <p className="font-bold">{user.name}</p>
                <div className="flex gap-4">
                  <ButtonContainer
                    style="buttonRed"
                    wFull="w-10"
                    hFull="h-9"
                    margin="mt-1"
                    onClick={() => handleDelete(user._id)}
                  >
                    <IconDelete size="h-[20px] w-[20px]" />
                  </ButtonContainer>
                  <ButtonContainer
                    href={`/funcionarios/cadastrar/${user._id}`}
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
      <MenuMobileContainer
        handleOpenModal={handleOpenMenuMobile}
        openModal={openMenuMobile}
      />
    </Container>
  );
}
