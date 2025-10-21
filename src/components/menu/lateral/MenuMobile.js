"use client";
import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import { SideModal } from "../../../components/modal/SideModal";
import Link from "next/link";

export const MenuMobile = ({ handleOpenModal, openModal, menuItems, user }) => {
  const [themeCurrent, setThemeCurrent] = useState("");

  useEffect(() => {
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
      <div className="relative flex flex-col w-[300px] gap-2 justify-start z-[10] rounded-sm m-2 bg-[var(--foreground)]">
        <div className="w-full grid grid-cols-12 px-2 h-[200px]">
          <Link
            href="/perfil"
            className="col-span-10 flex items-start pt-5 pl-5 flex-col w-full mr"
          >
            <div className="rounded-full border-1 p-[1px] mb-4">
              <div className="bg-cover bg-center rounded-full h-15 w-15 shadow-sm bg-[url(https://uploads.metropoles.com/wp-content/uploads/2023/10/26123632/Design-sem-nome-26-29.jpg)] "></div>
            </div>
            <span className="px-2 shadow-2xl font-bold ">
              {user.all[0]?.name}
            </span>
            <span className="px-2 shadow-2xl text-gray-500">Atendente</span>
          </Link>
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
        {menuItems.length > 0 && <Menu menuItems={menuItems} user={user} />}
      </div>
    </SideModal>
  );
};
