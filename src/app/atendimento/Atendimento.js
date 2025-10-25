"use client";

import React, { useEffect, useState, useMemo } from "react";

import { InputSearch } from "../../components/input/inputSearch";
import { Container } from "../../components/layout/Container";
import { Content } from "../../components/layout/Content";
import { Footer } from "../../components/layout/Footer";
import { Header, HeaderGrid } from "../../components/layout/Header";
import { Comanda } from "./Comanda";
import { ItemList } from "./ItemList";
import { IconMenuList } from "../../../public/icons/MenuList";
import { Item } from "./Item";
import { IconDotMenu } from "../../../public/icons/DotMenu";

import { isEmpty } from "../utils/empty";
import { MenuMobileContainer } from "../../components/menu/lateral";
import { ButtonContainer } from "../../components/button";
import { Loading } from "src/components/loading/Loading";

import { useToast } from "src/hooks/useToast";
import { toggleFullScreen } from "../utils/fullScreen";

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

export const Atendimento = ({ idComanda, _command, _item }) => {
  const code = idComanda.includes("-") ? idComanda.split("-")[0] : idComanda;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [rotated, setRotated] = useState(false);
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
      toast.success("Item enviado com sucesso!");
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

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleOpenModal = () => {
    toggleFullScreen()
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
        handleShowDetails={handleShowDetails}
      >
        <div>
          {showDetails
            ? comanda?.subOrders?.map((item, idx) => (
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
              ))
            : agruparSubOrdersEmanterEstrutura()?.map((item, idx) => (
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
      </Comanda>
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
            <ButtonContainer
              href="/comandas"
              wFull="w-[50px]"
              text={code}
            ></ButtonContainer>
            <InputSearch setInputText={setInputText} mini />
            <ButtonContainer onClick={handleOpenModal} wFull="w-[50px]">
              <span className="pl-1">
                <IconMenuList size="h-[32px] w-[32px]" />
              </span>
              {!!itemsSelected?.length && (
                <div className="absolute pt-[2px] text-xs text-white h-4 w-4 top-[2px] right-[1px] rounded-full flex justify-center items-center leading-none ">
                  {itemsSelected?.length}
                </div>
              )}
            </ButtonContainer>
          </div>
        </HeaderGrid>
      </Header>
        <Content isLoading={isLoading || _item.isLoading} error={error} margin="mt-[104px] mb-[60px]">
          {isEmpty(idComanda) ? (
            <div>
              <div>Selecione uma comanda antes de adiconar os produtos</div>
            </div>
          ) : (
            <div>
              <ItemList
                items={items}
                inputText={inputText}
                handleUpdateItemsSelected={handleUpdateItemsSelected}
                openModal={openModal}
                openType={openType}
                setOpenType={setOpenType}
              />
            </div>
          )}
        </Content>
      <Footer>
        <ButtonContainer
          onClick={saveCommand}
          disabled={itemsSelected?.length == 0}
          margin="mx-2 mb-2"
          style='buttonInline'
        >
          {!isLoadingCreate ? (
            <p className="text-sm">LANÇAR ITEM NA COMANDA</p>
          ) : (
            <Loading isLoading={isLoadingCreate} style="style3" />
          )}
        </ButtonContainer>
      </Footer>
      <MenuMobileContainer
        handleOpenModal={handleOpenMenuMobile}
        openModal={openMenuMobile}
      />
    </Container>
  );
};
