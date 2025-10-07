"use client";
import React, { useEffect, useState } from "react";
import { IconX } from "../../../public/icons/X";
import { Footer } from "../layout/Footer";
import { Header, HeaderGrid } from "../layout/Header";
import { currency } from "../../app/utils/currency";
import { IconCircleMoney } from "../../../public/icons/CircleMoney";
import { Button } from "../button/Button";
import { Loading } from "../loading/Loading";
import { useCounter } from "src/hooks/useCounter";
import { RotateImage } from "src/app/atendimento/Atendimento";

const ShowValue = ({ totalComanda }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      onClick={() => setShow(!show)}
      className={`${
        show ? (totalComanda >= 1000 ? "w-[370px]" : "w-[290px]") : "w-[50px]"
      } transition-all duration-300 ease-in-out flex text-2xl gap-2 pl-3 py-2 items-center font-bold text-[var(--text-default)] overflow-hidden`}
    >
      <span>
        <IconCircleMoney size="h-[25px] w-[25px]" />
      </span>
      {show && (
        <span className="whitespace-nowrap" style={{ lineHeight: 0 }}>
          {currency(totalComanda)}
        </span>
      )}
    </div>
  );
};

export const ModalRight = ({
  handleOpenModal,
  totalComanda,
  openModal,
  children,
  saveCommand,
  itemsSelected,
  isLoadingCreate,
  rotated,
}) => {
  const score = useCounter(0, 200);
  const [hidden, setHidden] = useState(true);
  const [animating, setAnimating] = useState(false);

  const testParaIniciarDivNoFim = () => {
    const div = document.getElementById("minhaDiv");
    if (div) {
      div.scrollTo({
        top: div.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    if (openModal) {
      setHidden(false);

      const t = setTimeout(() => setAnimating(true), 50);
      const a = setTimeout(() => testParaIniciarDivNoFim(), 50);
      return () => clearTimeout(t, a);
    } else {
      setAnimating(false);
    }
  }, [openModal]);

  return (
    <div
      className={`
        absolute bottom-0 top-0 h-full bg-[var(--background)] z-[100]
        transition-all duration-200 ease-in-out
        ${openModal && animating ? "w-full opacity-100" : "h-0 opacity-0"}
        ${hidden ? "hidden" : ""}
      `}
      onTransitionEnd={() => {
        if (!openModal) setHidden(true);
      }}
    >
      <Header h="h-[80px]" divider>
        <HeaderGrid>
          <div className="col-span-2" onClick={handleOpenModal}>
            <IconX size="h-[32px] w-[32px]" />
          </div>
          <div className="col-span-8 mt-2">
            <div className="w-full flex justify-center">
              <span className="text-xs font-bold">CARDAPIO</span>
            </div>
          </div>
          <div className="flex col-span-2 text-xs mt-2 justify-between">
            <RotateImage rotated={rotated} />
            {score}k
          </div>
        </HeaderGrid>
        <div className="w-full h-full flex px-2 gap-2 items-center">
          <div className="pl-2 font-bold min-w-[50px] max-w-[50px]">Quant</div>
          <div className="w-full flex ">
            <span className="text-md font-bold pl-2">Items</span>
          </div>
        </div>
      </Header>
      {/* Container do conteúdo com rolagem */}
      <div className="relative w-full h-full flex flex-col overflow-auto">
        <div
          className="flex-1 overflow-auto mt-[77px] mb-[65px] p-2"
          id="minhaDiv"
        >
          {children}
        </div>
      </div>

      <Footer>
        <div className="flex justify-center items-center w-full">
          <div className="relative w-full flex justify-center items-center">
            <ShowValue totalComanda={totalComanda} />
            <Button
              disabled={itemsSelected?.length == 0}
              margin="mx-2"
              onClick={saveCommand}
            >
              {!isLoadingCreate ? (
                "LANÇAR ITEMS NA COMANDA"
              ) : (
                <Loading isLoading={isLoadingCreate} style="style3" />
              )}
            </Button>
          </div>
        </div>
      </Footer>
    </div>
  );
};
