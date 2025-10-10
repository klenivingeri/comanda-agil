"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useConfig } from "../../app/context/ConfigContext";
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

import { isEmpty } from "../utils/empty";
import { MenuMobile } from "../../components/menu/lateral/MenuMobile";
import { Button } from "../../components/button/Button";
import { Loading } from "src/components/loading/Loading";

import { useToast } from "src/hooks/useToast";

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

export const Atendimento = ({ idComanda }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [rotated, setRotated] = useState(false);
  const { _item, _command } = useConfig();
  const code = idComanda.includes("-") ? idComanda.split("-")[0] : idComanda;
  const score = 200;
  const [items, setItems] = useState([]);
  const [comanda, setComanda] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCreate, setIsLoadingCreat] = useState(false);
  const [inputText, setInputText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openType, setOpenType] = useState(null);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [error, setError] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
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
      toast.success("Item enviado com sucesso!");
    } catch (_) {
      toast.error("Ocorreu um erro ao enviar o items");
    } finally {
      setIsLoadingCreat(false);
      setIsLoading(false);
    }
  };

  const fetchDeleteItemCommand = async (itemUUID) => {
    setIsLoadingCreat(true);
    setOpenModal(true);

    try {
      const resp = await fetch(
        `/api/comandas?_id=${comanda?._id}&itemUUID=${itemUUID}`,
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
            if (comandasData) setComanda(comandasData?.records);
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

  const handleOpenModal = () => {
    if (!openModal) {
      setScrollPosition(window.scrollY);
    } else {
      const t = setTimeout(() => window.scrollTo({ top: scrollPosition }), 50);
    }
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

  const handleDeleteItemSelected = (itemUUID) => {
    fetchDeleteItemCommand(itemUUID);
  };

  const handleShowDelete = () => setShowDelete(!showDelete);

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
    return (
      <ModalRight
        handleOpenModal={handleOpenModal}
        openModal={openModal}
        totalComanda={totalComanda}
        saveCommand={saveCommand}
        itemsSelected={itemsSelected}
        isLoadingCreate={isLoadingCreate}
        rotated={rotated}
        handleShowDelete={handleShowDelete}
        commandID={comanda?._id}
      >
        <div>
          {comanda?.subOrders?.map((item, idx) => (
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
        </div>
      </ModalRight>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderGrid>
          <div className="col-span-2" onClick={handleOpenMenuMobile}>
            <IconDotMenu size="h-[32px] w-[32px]" />
          </div>
          <div className="col-span-8 mt-2">
            <div className="w-full flex justify-center">
              <span className="text-xs font-bold">CARDAPIO</span>
            </div>
          </div>
          <div className="flex text-xs col-span-2 mt-2 pb-2 justify-between">
            <RotateImage rotated={rotated} />
            {score}k
          </div>
        </HeaderGrid>
        <HeaderGrid>
          <div className="relative col-span-12 flex items-end gap-2">
            <Button href="/comandas" wFull="w-[50px]" text={code}></Button>
            <InputSearch setInputText={setInputText} mini />
            <Button onClick={handleOpenModal} wFull="w-[50px]">
              <span className="pl-1">
                <IconMenuList size="h-[32px] w-[32px]" />
              </span>
              {!!itemsSelected?.length && (
                <div className="absolute pt-[2px] text-xs text-white h-4 w-4 top-[2px] right-[1px] rounded-full flex justify-center items-center leading-none ">
                  {itemsSelected?.length}
                </div>
              )}
            </Button>
          </div>
        </HeaderGrid>
      </Header>
      <div className="mt-[104px] mb-[60px] flex-1 flex flex-col">
        <Content isLoading={isLoading || _item.isLoading} error={error}>
          {isEmpty(idComanda) ? (
            <div>Selecione uma comanda antes de adiconar os produtos</div>
          ) : (
            <ItemList
              items={items}
              inputText={inputText}
              handleUpdateItemsSelected={handleUpdateItemsSelected}
              openModal={openModal}
              openType={openType}
              setOpenType={setOpenType}
            />
          )}
        </Content>
      </div>
      <Footer>
        <Button
          onClick={saveCommand}
          disabled={itemsSelected?.length == 0}
          margin="mx-2 mb-2"
          text=""
        >
          {!isLoadingCreate ? (
            "LANÇAR ITEMS NA COMANDA"
          ) : (
            <Loading isLoading={isLoadingCreate} style="style3" />
          )}
        </Button>
      </Footer>
      <MenuMobile
        handleOpenModal={handleOpenMenuMobile}
        openModal={openMenuMobile}
      />
    </Container>
  );
};
