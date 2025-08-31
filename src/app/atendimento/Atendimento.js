"use client";

import React, { useEffect, useState, useMemo } from "react";
import { InputSearch } from "../../components/input/inputSearch";
import { Container } from "../../components/layout/Container";
import { Content } from "../../components/layout/Content";
import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { ModalRight } from "../../components/modal/ModaLRight";
import { ItemList } from "./ItemList";
import { IconMenuList } from "../../../public/icons/MenuList";
import { Item } from "./Item";
import { IconDotMenu } from "../../../public/icons/DotMenu";
import { IconMenuSquare } from "../../../public/icons/MenuSquare";

import Link from "next/link";

import { isEmpty } from "../utils/empty";
import { MenuMobile } from "../../components/menu/lateral/MenuMobile";

export const Atendimento = ({ idComanda }) => {
  const [items, setItems] = useState([]);
  const [comanda, setComanda] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsRes, comandasRes] = await Promise.all([
          fetch(`/api/items?id=test`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
          fetch(`/api/comandas?id=${idComanda}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
        ]);

        const [itemsData, comandasData] = await Promise.all([
          itemsRes.json(),
          comandasRes.json(),
        ]);

        setItems(itemsData.records);
        setComanda(comandasData.records[0]);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleOpenMenuMobile = () => {
    setOpenMenuMobile(!openMenuMobile);
  };

  const handleUpdateItemsSelected = (item, value) => {
    const newArray = items.map((i) => {
      if (i.id == item.id) {
        return { ...i, quantity: value };
      }

      return i;
    });

    setItems(newArray);
  };

  const totalItems = useMemo(() => {
    return items.filter((item) => item?.quantity > 0);
  }, [items]);

  const itemsSelected = useMemo(() => {
    return items.filter((item) => item?.quantity > 0);
  }, [items]);

  const totalComanda = useMemo(() => {
    return itemsSelected
      .concat(comanda?.items)
      .reduce((acc, item) => acc + (item?.quantity * item?.price || 0), 0);
  }, [comanda?.items, itemsSelected]);

  return (
    <Container>
      <Header>
        <div className="flex flex-col w-full gap-2 justify-start">
          <div className="w-full grid grid-cols-12 px-2 h-[40px]">
            <Link
              href="/comandas"
              className="col-span-2 flex items-center pt-2 gap-1"
            >
              <IconMenuSquare size="h-[26px] w-[26px]" />
              <div className="font-bold text-lg text-black">123</div>
            </Link>
            <div className="col-span-8 flex items-center">
              <div className="w-full flex justify-center">
                <span className="text-md font-bold">Cardapio</span>
              </div>
            </div>
            <div
              className="col-span-2 flex items-end justify-end pt-1"
              onClick={handleOpenMenuMobile}
            >
              <IconDotMenu size="h-[32px] w-[32px]" />
            </div>
          </div>
          <div className="w-full grid grid-cols-12 px-2 gap-2">
            <div className="col-span-12 flex items-center gap-2">
              <InputSearch setInputText={setInputText} />
              <button
                onClick={handleOpenModal}
                className="relative text-black rounded-md flex justify-center items-center h-[40px] px-2"
              >
                <span>
                  <IconMenuList size="h-[32px] w-[32px]" />
                </span>
                {!!totalItems.length && (
                  <div className="absolute text-xs text-white h-4 w-4 bg-[var(--button)] top-[-1px] right-[10px] rounded-full flex justify-center items-center leading-none">
                    {totalItems.length}
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </Header>
      <div className="mt-[85px] mb-[50px] flex-1 flex flex-col">
        <Content isLoading={isLoading}>
          {isEmpty(idComanda) ? (
            <div>Selecione uma comanda antes de adiconar os produtos</div>
          ) : (
            <ItemList
              items={items}
              inputText={inputText}
              handleUpdateItemsSelected={handleUpdateItemsSelected}
            />
          )}
        </Content>
      </div>
      <Footer>
        <div className="flex justify-center items-center w-full">
          <div className="relative w-full flex justify-center items-center">
            <button className="text-white shadow-sm font-bold py-3 px-4 rounded-3xl w-full m-2 bg-[var(--button)] hover:bg-[var(--buttonHover)]">
              <span className=""> LANÇAR ITEMS NA COMANDA</span>
            </button>
          </div>
        </div>
      </Footer>

      <ModalRight
        handleOpenModal={handleOpenModal}
        openModal={openModal}
        totalComanda={totalComanda}
      >
        <div>
          {comanda?.items?.map((item, idx) => (
            <Item
              key={idx}
              item={item}
              handleAddTotalItemsInTheCategiry={() => {}}
              handleRemoveTotalItemsInTheCategiry={() => {}}
              handleUpdateItemsSelected={handleUpdateItemsSelected}
              hiddeSelectQuantity
              itemInNote
            />
          ))}
          {itemsSelected.map((item, idx) => (
            <Item
              key={idx}
              item={item}
              handleAddTotalItemsInTheCategiry={() => {}}
              handleRemoveTotalItemsInTheCategiry={() => {}}
              handleUpdateItemsSelected={handleUpdateItemsSelected}
              itemInNote
              hideValue
            />
          ))}
        </div>
      </ModalRight>
      <MenuMobile
        handleOpenModal={handleOpenMenuMobile}
        openModal={openMenuMobile}
      />
    </Container>
  );
};
