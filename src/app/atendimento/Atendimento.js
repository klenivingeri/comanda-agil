"use client";

import React, { useEffect, useState, useMemo } from "react";
import { InputSearch } from "../../components/input/inputSearch";
import { Container } from "../../components/layout/Container";
import { Content } from "../../components/layout/Content";
import { Footer } from "../../components/layout/Footer";
import { Header, HeaderGrid } from "../../components/layout/Header";
import { ModalRight } from "../../components/modal/ModaLRight";
import { ItemList } from "./ItemList";
import { IconMenuList } from "../../../public/icons/MenuList";
import { Item } from "./Item";
import { IconDotMenu } from "../../../public/icons/DotMenu";

import Link from "next/link";

import { isEmpty } from "../utils/empty";
import { MenuMobile } from "../../components/menu/lateral/MenuMobile";
import { Button } from "../../components/button/Button";

export const Atendimento = ({ idComanda }) => {
  const [items, setItems] = useState([]);
  const [comanda, setComanda] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsRes, comandasRes] = await Promise.all([
          fetch(`/api/items`, {
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
        setError(true);
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
      if (i._id == item._id) {
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
      <Header divider>
        <HeaderGrid>
          <div className="col-span-2" onClick={handleOpenMenuMobile}>
            <IconDotMenu size="h-[32px] w-[32px]" />
          </div>
          <div className="col-span-8 flex items-center">
            <div className="w-full flex justify-center">
              <span className="text-md font-bold">Cardapio</span>
            </div>
          </div>
          <Link href="/comandas" className="col-span-2 flex justify-end">
            <div className="flex font-bold text-xl text-[var(--bg-subTitle)] h-[32px] w-full justify-center items-center rounded-r-full rounded-l-full bg-[var(--text-default)]">
              {idComanda}
            </div>
          </Link>
        </HeaderGrid>
        <HeaderGrid>
          <div className="col-span-12 flex items-center gap-2">
            <InputSearch setInputText={setInputText} />
            <button
              onClick={handleOpenModal}
              className={`relative ${
                !isEmpty(totalComanda)
                  ? "bg-[var(--button-default)]"
                  : "bg-[var(--button-disabled)]"
              } rounded-md flex justify-center items-center h-[40px] pl-4 pr-2  text-white`}
            >
              <span>
                <IconMenuList size="h-[32px] w-[32px]" />
              </span>
              {!!totalItems.length && (
                <div className="absolute pt-[2px] text-xs text-white h-4 w-4 top-[2px] right-[1px] rounded-full flex justify-center items-center leading-none ">
                  {totalItems.length}
                </div>
              )}
            </button>
          </div>
        </HeaderGrid>
      </Header>
      <div className="mt-[95px] mb-[50px] flex-1 flex flex-col">
        <Content isLoading={isLoading} error={error}>
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
            <Button margin="mx-2 mb-2">
              <span className="">LANÇAR ITEMS NA COMANDA</span>
            </Button>
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
