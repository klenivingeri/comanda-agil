"use client";
import React, { useEffect, useState } from "react";
import { IconX } from "../../../public/icons/X";
import { Footer } from "../layout/Footer";
import { Header, HeaderGrid } from "../layout/Header";
import { currency } from "../../app/utils/currency";
import { IconCircleMoney } from "../../../public/icons/CircleMoney";
import { Button } from "../button/Button";

const ShowValue = ({ totalComanda }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      onClick={() => setShow(!show)}
      className={`${
        show ? "w-[250px] " : "pr-2"
      } transition-all duration-70 ease-in-out flex text-2xl gap-2 pl-3 py-2 items-center font-bold text-[var(--text-default)]`}
    >
      <span>
        <IconCircleMoney size="h-[25px] w-[25px]" />
      </span>
      {show && <span style={{ lineHeight: 0 }}>{currency(totalComanda)}</span>}
    </div>
  );
};

export const ModalRight = ({
  handleOpenModal,
  totalComanda,
  openModal,
  children,
}) => {
  const [hidden, setHidden] = useState(true);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (openModal) {
      window.scrollTo({ top: 0 });
      setHidden(false);

      const t = setTimeout(() => setAnimating(true), 50);
      return () => clearTimeout(t);
    } else {
      setAnimating(false);
    }
  }, [openModal]);

  return (
    <div
      className={`
        absolute right-0 top-0 h-full bg-[var(--background)] z-[100]
        transition-all duration-300 ease-in-out
        ${openModal && animating ? "w-full opacity-100" : "w-0 opacity-0"}
        ${hidden ? "hidden" : ""}
      `}
      onTransitionEnd={() => {
        if (!openModal) setHidden(true);
      }}
    >
      <Header h="h-[65px]" divider>
        <HeaderGrid>
          <div
            className="col-span-2 flex items-center"
            onClick={handleOpenModal}
          >
            <IconX size="h-[30px] w-[30px]" />
          </div>
          <div className="col-span-8 flex items-center">
            <div className="w-full flex justify-center pt-2">
              <span className="text-md font-bold">Comanda</span>
            </div>
          </div>
          <div className="col-span-2 flex items-end pt-1"></div>
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
        <div className="flex-1 overflow-auto mt-[60px] mb-[50px] p-2">
          {children}
        </div>
      </div>

      <Footer>
        <div className="flex justify-center items-center w-full">
          <div className="relative w-full flex justify-center items-center">
            <ShowValue totalComanda={totalComanda} />
            <Button text="LANÇAR ITEMS NA COMANDA" margin="mx-2" />
          </div>
        </div>
      </Footer>
    </div>
  );
};
