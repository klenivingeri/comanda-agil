"use client";
import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import { isEmpty } from "../../../app/utils/empty";
import { SideModal } from "../../../components/modal/SideModal";

export const MenuMobile = ({ handleOpenModal, openModal }) => {
  const [themeCurrent, setThemeCurrent] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  const getMenu = async () => {
    const res = await fetch(`/api/menu`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const menuItems = await res.json();
    setMenuItems(menuItems.records);
    localStorage.setItem("menu", JSON.stringify(menuItems.records));
  };

  useEffect(() => {
    getMenu(); //sempre buscar o menu pra teste
    const saveMenuItems = localStorage.getItem("menu");
    if (isEmpty(saveMenuItems)) {
      getMenu();
    } else {
      setMenuItems(JSON.parse(saveMenuItems));
    }

    const savedTheme = localStorage.getItem("theme");
    setThemeCurrent(savedTheme);
  }, []);

  const handleSetTheme = (color) => {
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme !== color) {
      root.classList.remove(savedTheme);
    }
    setThemeCurrent(color);
    root.classList.add(color);
    localStorage.setItem("theme", color);
  };

  return (
    <SideModal isOpen={openModal} onClose={() => handleOpenModal(false)}>
      <div className="relative flex flex-col w-[300px] gap-2 justify-start z-[10] rounded-2xl m-2 bg-[var(--foreground)]">
        <div className="w-full grid grid-cols-12 px-2 h-[200px]">
          <div className="col-span-10 flex items-start pt-5 pl-5 flex-col w-full mr">
            <div className="rounded-full border-1 p-[1px] mb-4">
              <div className="bg-cover bg-center rounded-full h-15 w-15 shadow-sm bg-[url(https://uploads.metropoles.com/wp-content/uploads/2023/10/26123632/Design-sem-nome-26-29.jpg)] "></div>
            </div>
            <span className="px-2 shadow-2xl font-bold ">Fulano Silva</span>
            <span className="px-2 shadow-2xl text-gray-500">Atendente</span>
          </div>
          <div className="col-span-2 flex items-start pt-5 flex-col w-full mr">
            {themeCurrent === "dark" ? (
              <button onClick={() => handleSetTheme("light")} className="p-3">
                🌙
              </button>
            ) : (
              <button onClick={() => handleSetTheme("dark")} className="p-3">
                ☀️
              </button>
            )}
          </div>

          <span className=" col-span-12 border-b-1 flex w-full border-gray-300 mt-4" />
        </div>
        <Menu menuItems={menuItems} />
      </div>
    </SideModal>
  );
};
