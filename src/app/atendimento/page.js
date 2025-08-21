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

const itemsComanda = [
  {
    id: "000",
    name: "Pastel de carne",
    price: 20,
    type: "fritos",
    typeLabel: "Fritos",
  },
  {
    id: "000",
    name: "Pastel de queijo",
    price: 1.5,
    type: "fritos",
    typeLabel: "Fritos",
  },
  {
    id: "000",
    name: "Pastel de pizza",
    price: 11,
    type: "fritos",
    typeLabel: "Fritos",
  },
  {
    id: "000",
    name: "Pastel de carne com queijo de carne com queijo",
    price: 4.6,
    type: "fritos",
    typeLabel: "Fritos",
  },
];

export default function Atendimento() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const getList = async () => {
    const res = await fetch(`/api/items?id=test`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const itemsDaComanda = await res.json();

    setItems(itemsDaComanda.records);
    setIsLoading(false);
  };

  useEffect(() => {
    getList();
  }, []);

  const handleButtonClick = () => {
    setIsPinging(true);
  };

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleUpdateItemsSelected = (item, value) => {
    console.log("aaaaaaaaaa");
    const newArray = items.map((i) => {
      if (i.id == item.id) {
        return { ...i, quantity: value };
      }

      return i;
    });

    setItems(newArray);
  };

  const total = useMemo(() =>
    items.reduce((acc, item) => {
      if (item?.quantity) {
        return acc + item?.quantity;
      }
      return acc;
    }, 0)
  );

  const handleRemoveItemsSelected = (id) => {
    //Atualizar pra UUID
  };

  return (
    <Container>
      <Header>
        <div className="flex flex-col w-full gap-2 justify-start">
          <div className="w-full grid grid-cols-12 px-2 h-[40px]">
            <div className="col-span-1 flex items-center pt-2">
              <div className="px-3 font-bold text-white rounded-3xl border-t-2 border-b-2 bg-[var(--button)]">
                123
              </div>
            </div>
            <div className="col-span-10 flex items-end">
              <div className="w-full flex justify-center">
                <span className="text-shadow-md text-2xl font-bold">
                  Cardapio
                </span>
              </div>
            </div>
            <div className="col-span-1 flex items-end pt-1">
              <div className="h-[35px] w-[35px]  shadow-sm rounded-full bg-[url(https://yt3.googleusercontent.com/ytc/AIdro_nVCCXkptyc7S3f6cWhUf_VQc36D6wFeg679ckPMA=s900-c-k-c0x00ffffff-no-rj)]  bg-center bg-cover bg-no-repeat"></div>
            </div>
          </div>
          <div className="w-full grid grid-cols-12 px-2 gap-2">
            <div className="col-span-10 flex items-center">
              <InputSearch setInputText={setInputText} />
            </div>
            <div className="col-span-2 flex items-center justify-end">
              <div className="grid grid-cols-2 w-full h-full gap-2">
                <div className="col-span-2 flex justify-center items-center">
                  <button
                    onClick={handleOpenModal}
                    className=" relative shadow-sm w-full text-white bg-[var(--button)] hover:bg-[var(--buttonHover)] h-full rounded-md flex justify-center items-center "
                  >
                    <IconMenuList size="h-[25px] w-[25px]" />
                    {!!total && (
                      <div className="absolute h-5 w-5 bg-green-600 top-[-7px] right-[-5px] rounded-full flex justify-center items-center leading-none">
                        {total}
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Header>
      <div className="mt-[85px] mb-[50px] flex-1 flex flex-col">
        <Content isLoading={isLoading}>
          <ItemList
            items={items}
            inputText={inputText}
            handleUpdateItemsSelected={handleUpdateItemsSelected}
            handleRemoveItemsSelected={handleRemoveItemsSelected}
          />
        </Content>
      </div>
      <Footer>
        <div className="flex justify-center items-center w-full">
          <div className="relative w-full flex justify-center items-center">
            <button
              className="text-white shadow-sm font-bold py-2 px-4 rounded w-full m-2 bg-[var(--button)] hover:bg-[var(--buttonHover)]"
              onClick={handleButtonClick}
            >
              <span className=""> LANÇAR ITEMS NA COMANDA</span>
            </button>
          </div>
        </div>
      </Footer>

      <ModalRight handleOpenModal={handleOpenModal} openModal={openModal}>
        <div>
          {itemsComanda.map((item, idx) => (
            <Item
              key={idx}
              item={item}
              handleAddTotalItemsInTheCategiry={() => {}}
              handleRemoveTotalItemsInTheCategiry={() => {}}
              handleUpdateItemsSelected={handleUpdateItemsSelected}
              handleRemoveItemsSelected={handleRemoveItemsSelected}
              hiddeSelectQuantity
            />
          ))}
          <ItemList
            items={items}
            inputText="abc"
            handleUpdateItemsSelected={handleUpdateItemsSelected}
            handleRemoveItemsSelected={handleRemoveItemsSelected}
          />
        </div>
      </ModalRight>
    </Container>
  );
}
