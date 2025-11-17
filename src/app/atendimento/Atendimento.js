"use client";

import React, { useEffect, useState, useMemo } from "react";

import { Container } from "../../components/layout/Container";
import { Content } from "../../components/layout/Content";
import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { Comanda } from "./Comanda";

import { IconMenu } from "../../../public/icons/MenuList";
import { Item } from "./Item";

import { isEmpty } from "../utils/empty";
import { ButtonContainer } from "../../components/button";
import { Loading } from "src/components/loading/Loading";

import { useToast } from "src/hooks/useToast";
import { IconChecked } from "public/icons/Checked";
import { ItemLists } from "./ItemLists";
import { Checkout } from "src/components/Checkout";

export function RotateImage({ rotated }) {
  return (
    <div className="">
      <img
        src="/assets/score.png"
        width={16}
        height={16}
        alt="Logo"
        className={`transition-transform duration-500 ease-in-out ${
          rotated ? "rotate-y-180" : "rotate-y-0"
        }`}
      />
    </div>
  );
}

export const Atendimento = ({ idComanda, _command, _item, _category }) => {
  const code = idComanda.includes("-") ? idComanda.split("-")[0] : idComanda;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [rotated, setRotated] = useState(false);
  const [items, setItems] = useState([]);
  const [comanda, setComanda] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCreate, setIsLoadingCreat] = useState(false);
  const [inputText, setInputText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [tabPayment, setTabPayment] = useState(false);
  const [openType, setOpenType] = useState(null);
  const [error, setError] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [itemsSelected, setItemsSelected] = useState([]);
  const toast = useToast();

  const fetchCreateCommand = async (payload) => {
    setShowDelete(false);
    setRotated(!rotated);
    setIsLoadingCreat(true);
    setOpenModal(true);

    try {
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
      toast.success(<IconChecked size="h-[40px] w-[40px]" />);
    } catch (_) {
      toast.error("Ocorreu um erro ao enviar o items");
    } finally {
      setIsLoadingCreat(false);
      setIsLoading(false);
    }
  };

  const fetchDeleteItemCommand = async (itemUUID, rest) => {
    setIsLoadingCreat(true);
    setOpenModal(true);

    try {
      const resp = await fetch(
        `/api/comandas?_id=${comanda?._id}&itemUUID=${itemUUID}${
          rest ? `&rest=${rest}` : ""
        }`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await resp.json();
      setComanda(result?.records);

      toast.success("Item deletado");
    } catch (_) {
      toast.error("Ocorreu um erro ao deletar item");
    } finally {
      setIsLoadingCreat(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setItems(_item.all);
  }, [_item.all]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _id = idComanda?.split("-")[1];
        const caixa = idComanda?.split("-")[2];
        if (caixa) {
          setOpenModal(true);
        }
        if (_id) {
          const hasCommand = _command.all.find((c) => c._id == _id);
          if (hasCommand?._id) {
            setComanda(hasCommand);
          } else {
            const comandasRes = await fetch(`/api/comandas?_id=${_id}`, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            });
            const comandasData = await comandasRes?.json();
            if (comandasData) setComanda(comandasData?.records[0]);
          }
        }
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleOpenModal = () => {
    if (!openModal) {
      setScrollPosition(window.scrollY);
    } else {
      const t = setTimeout(() => window.scrollTo({ top: scrollPosition }), 50);
    }
    setOpenModal(!openModal);
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

  const handleDeleteItemSelected = (itemUUID, rest) => {
    fetchDeleteItemCommand(itemUUID, rest);
  };

  const handleShowDelete = () => {
    handleShowDetails();
    setShowDelete(!showDelete);
  };

  useEffect(() => {
    const selected = items?.filter((item) => item?.quantity > 0);
    setItemsSelected(selected);
  }, [items]);

  const totalComanda = useMemo(() => {
    if (!itemsSelected) return 0;

    return [...itemsSelected, ...(comanda?.subOrders || [])].reduce(
      (acc, item) => {
        const quantity = item?.quantity || 0;
        const price = item?.product?.price ?? item?.price ?? 0;
        return acc + quantity * price;
      },
      0
    );
  }, [itemsSelected, comanda?.subOrders]);

    const totalSelected = useMemo(() => {
    if (!itemsSelected) return 0;

    return itemsSelected.reduce(
      (acc, item) => {
        const quantity = item?.quantity || 0;
        return acc + quantity
      },
      0
    );
  }, [itemsSelected, comanda?.subOrders]);

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

  if (openModal) {
    function agruparSubOrdersEmanterEstrutura(data) {
      const subOrders = comanda?.subOrders;
      if (!subOrders) return [];

      const groupedItems = subOrders?.reduce((acc, currentOrder) => {
        const productId = currentOrder.product._id;
        const currentQuantity = currentOrder.quantity;

        if (!acc[productId]) {
          acc[productId] = { ...currentOrder };
        } else {
          acc[productId].quantity += currentQuantity;
        }

        return acc;
      }, {});

      const finalGroupedArray = Object.values(groupedItems);

      return finalGroupedArray;
    }

    if(tabPayment){
      return (
        <Checkout
        totalComanda={totalComanda}
        commandID={comanda?._id}
        setTabPayment={setTabPayment}
        commandCode={code}
      />
      )
    }

    return (
      <Comanda
        handleOpenModal={handleOpenModal}
        openModal={openModal}
        totalComanda={totalComanda}
        saveCommand={saveCommand}
        itemsSelected={itemsSelected}
        isLoadingCreate={isLoadingCreate}
        rotated={rotated}
        handleShowDelete={handleShowDelete}
        commandID={comanda?._id}
        commandCode={code}
        handleShowDetails={handleShowDetails}
        setTabPayment={setTabPayment}
      >
        <span>
          {showDetails
            ? comanda?.subOrders?.map((item, idx) => (
                <div
                  key={idx}
                  className="opacity-0 animate-fade-in"
                  style={{
                    animationDelay: `${idx * 0.01}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <Item
                    key={idx}
                    item={{
                      ...item.product,
                      quantity: item.quantity,
                      user: item.userId,
                    }}
                    uuidItemInCommand={item._id}
                    handleAddTotalItemsInTheCategiry={() => {}}
                    handleRemoveTotalItemsInTheCategiry={() => {}}
                    handleUpdateItemsSelected={handleUpdateItemsSelected}
                    handleDeleteItemSelected={handleDeleteItemSelected}
                    hiddeSelectQuantity
                    itemInNote
                    showDelete={showDelete}
                  />
                </div>
              ))
            : agruparSubOrdersEmanterEstrutura()?.map((item, idx) => (
                <div
                  key={idx}
                  className="opacity-0 animate-fade-in"
                  style={{
                    animationDelay: `${idx * 0.01}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <Item
                    key={idx}
                    item={{
                      ...item.product,
                      quantity: item.quantity,
                    }}
                    uuidItemInCommand={item._id}
                    handleAddTotalItemsInTheCategiry={() => {}}
                    handleRemoveTotalItemsInTheCategiry={() => {}}
                    handleUpdateItemsSelected={handleUpdateItemsSelected}
                    handleDeleteItemSelected={handleDeleteItemSelected}
                    hiddeSelectQuantity
                    itemInNote
                    showDelete={showDelete}
                  />
                </div>
              ))}
          {itemsSelected?.map((item, idx) => (
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
        </span>
      </Comanda>
    );
  }

  return (
    <Container>
      <Header divider setInputText={setInputText} title="Cardapio">
        <span className="flex mx-2 items-center gap-2 text-4xl font-bold rounded-lg text-[var(--button-default)] cursor-pointer">
          {!comanda?.code ? "*": ""}{code}
        </span>
      </Header>
      <Content
        isLoading={isLoading || _item.isLoading}
        error={error}
        pb="pb-[140px]"
      >
        {isEmpty(idComanda) ? (
          <div>
            <div>Selecione uma comanda antes de adiconar os produtos</div>
          </div>
        ) : (
          <div>
            <ItemLists
              items={items}
              _category={_category}
              inputText={inputText}
              handleUpdateItemsSelected={handleUpdateItemsSelected}
              openModal={openModal}
              openType={openType}
              setOpenType={setOpenType}
            />
          </div>
        )}
      </Content>
      <Footer bg="">
        <div className="flex flex-col w-full px-2">
          {(itemsSelected?.length === 0 ||
            comanda?.subOrders?.length !== 0) && (
            <div className="relative w-full h-1">
              <button
                onClick={handleOpenModal}
                className="absolute shadow-md border-2 border-[var(--foreground)] right-4 top-[-70px]  text-white  bg-[var(--button-default)] hover:bg-[var(--button-hover)] rounded-2xl px-2 py-2"
              >
                <IconMenu size="h-[32px] w-[32px]" />
                {itemsSelected?.length > 0 && (
                  <div className="absolute pt-[2px] text-sm font-semibold h-5 w-5 top-[4px] bg-[var(--button-default)] right-[6px] rounded-full flex justify-center items-center leading-none ">
                    {totalSelected}
                  </div>
                )}
              </button>
            </div>
          )}
          <ButtonContainer
            onClick={saveCommand}
            disabled={itemsSelected?.length == 0}
            margin="mb-1"
            hFull="h-12"
          >
            {!isLoadingCreate ? (
              <p className="text-sm">
                LANÇAR ITEM{itemsSelected?.length > 1 && `S`} 
              </p>
            ) : (
              <Loading isLoading={isLoadingCreate} style="style3" />
            )}
          </ButtonContainer>
          
        </div>
      </Footer>
    </Container>
  );
};
