"use client";
import React, { useEffect, useState } from "react";
import { IconX } from "../../../public/icons/X";
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import { currency } from "../../app/utils/currency";
import { IconCircleMoney } from "../../../public/icons/CircleMoney";

const ShowValue = ({ totalComanda }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className={`${
        show ? "w-[300px] " : "pr-2"
      } flex text-2xl gap-2 pl-3 items-center font-bold `}
    >
      <span onClick={() => setShow(!show)}>
        <IconCircleMoney size="h-[25px] w-[25px]" />
      </span>
      {show && <span style={{ lineHeight: 0 }}>{currency(totalComanda)}</span>}
    </div>
  );
};

export const ModalBot = ({
  handleOpenModal,
  totalComanda,
  openModal,
  children,
}) => {
  const [hidden, setHidden] = useState(true);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (openModal) {
      setHidden(false);

      // espera um tick antes de animar (pra tirar o hidden primeiro)
      const t = setTimeout(() => setAnimating(true), 50);
      return () => clearTimeout(t);
    } else {
      setAnimating(false);
    }
  }, [openModal]);

  return (
    <>
      <div
        className={`
          fixed inset-0 bg-black/50 transition-opacity duration-300 z-[90]
          ${
            openModal && animating
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }
          ${hidden ? "hidden" : ""}
        `}
        onClick={handleOpenModal}
      />

      <div
        className={`
          fixed bottom-0 left-0 w-full z-[100]
          transition-all duration-300 ease-in-out p-2
          ${openModal && animating ? " opacity-100" : "h-0 opacity-0"}
          ${hidden ? "hidden" : ""}
        `}
        onTransitionEnd={() => {
          if (!openModal) setHidden(true);
        }}
      >
        <div className=" bg-[var(--bg-subTitle)] rounded-2xl ">
          <div className="flex flex-col w-full gap-2 justify-start">
            <div className="w-full grid grid-cols-12 px-2 h-[40px]">
              <div
                className="col-span-2 flex items-center pt-2"
                onClick={handleOpenModal}
              >
                <IconX size="h-[30px] w-[30px]" />
              </div>
              <div className="col-span-8 flex items-center mt-1">
                <div className="w-full flex justify-center">
                  <span className="text-md font-bold">Nova Comanda</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full flex flex-col overflow-auto">
            <div className="flex-1 overflow-auto p-2">{children}</div>
          </div>

          <div className="flex justify-center items-center w-full">
            <div className="relative w-full flex justify-center items-center">
              <button className="text-white shadow-sm font-bold py-2 px-4 rounded w-full m-4 bg-[var(--button)] hover:bg-[var(--buttonHover)] truncate">
                <span className="">CRIAR COMANDA</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
