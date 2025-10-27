"use client";
import React from "react";
import { useMenu } from "../../../app/context/MenuContext";
import { useUserConfig } from "../../../app/context/UserContext";
import { MenuMobile } from "./MenuMobile";

export const MenuMobileContainer = ({ handleOpenModal, openModal }) => {
  const { _menu } = useMenu();
  const { _user } = useUserConfig();

  return <MenuMobile
    handleOpenModal={handleOpenModal}
    openModal={openModal}
    user={_user}
    menu={_menu}
  />
}
