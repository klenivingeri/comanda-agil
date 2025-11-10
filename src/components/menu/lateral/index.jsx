"use client";
import React, { useEffect } from "react";
import { useMenu } from "../../../app/context/MenuContext";
import { MenuMobile } from "./MenuMobile";

export const MenuMobileContainer = ({ handleOpenModal, openModal }) => {
  const { _menu } = useMenu();
  useEffect(() => {
    _menu.get();
  },[])

  return <MenuMobile
    handleOpenModal={handleOpenModal}
    openModal={openModal}
    menu={_menu}
  />
}
