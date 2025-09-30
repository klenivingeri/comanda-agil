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
  const code = idComanda.includes("-") ? idComanda.split("-")[0] : idComanda;

  const [items, setItems] = useState([]);
  const [comanda, setComanda] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [error, setError] = useState(false);

  const fetchCreateCommand = async (payload) => {
    setIsLoading(true);
    setOpenModal(true);

    const resp = await fetch(
      `/api/comandas${comanda?._id ? `?_id=${comanda?._id}` : ""}`,
      {
        method: comanda?._id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const result = await resp.json();
    setComanda(result?.records);

    setItems(
      items.map((item) => {
        return { ...item, quantity: 0 };
      })
    );
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _id = idComanda.split("-")[1];

        const requests = [
          fetch(`/api/items`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
        ];

        if (_id) {
          requests.push(
            fetch(`/api/comandas?_id=${_id}`, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            })
          );
        }

        const responses = await Promise.all(requests);
        const [itemsRes, comandasRes] = responses;

        const [itemsData, comandasData] = await Promise.all([
          itemsRes.json(),
          comandasRes?.json(),
        ]);

        if (itemsData) setItems(itemsData.records);
        if (comandasData) setComanda(comandasData?.records);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    console.log("aaaaaaaaa");
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
      .concat(comanda?.subOrders)
      .reduce(
        (acc, item) => acc + (item?.quantity * item.product?.price || 0),
        0
      );
  }, [comanda?.items, itemsSelected]);

  const saveCommand = () => {
    const payload = {
      code,
      payment: {
        method: "CASH",
        amount: totalComanda,
      },
      subOrders: itemsSelected
        .map((item) => {
          return {
            product: item?._id,
            quantity: item?.quantity || 0,
          };
        })
        .filter((item) => item?.quantity > 0),
    };

    fetchCreateCommand(payload);
  };
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
              {code}
            </div>
          </Link>
        </HeaderGrid>
        <HeaderGrid>
          <div className="relative col-span-12 flex items-end gap-2">
            <Button href="/comandas" wFull="w-[50px]" text={code}></Button>
            <InputSearch setInputText={setInputText} mini />
            <Button
              onClick={handleOpenModal}
              disabled={isEmpty(comanda?._id)}
              wFull="w-[50px]"
            >
              <span className="pl-1">
                <IconMenuList size="h-[32px] w-[32px]" />
              </span>
              {!!totalItems.length && (
                <div className="absolute pt-[2px] text-xs text-white h-4 w-4 top-[2px] right-[1px] rounded-full flex justify-center items-center leading-none ">
                  {totalItems.length}
                </div>
              )}
            </Button>
          </div>
        </HeaderGrid>
      </Header>
      <div className="mt-[104px] mb-[60px] flex-1 flex flex-col">
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
        <Button
          onClick={saveCommand}
          margin="mx-2 mb-2"
          text="LANÇAR ITEMS NA COMANDA"
        />
      </Footer>
      <ModalRight
        handleOpenModal={handleOpenModal}
        openModal={openModal}
        totalComanda={totalComanda}
      >
        <div>
          {comanda?.subOrders?.map((item, idx) => (
            <Item
              key={idx}
              item={{
                ...item.product,
                quantity: item.quantity,
              }}
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
