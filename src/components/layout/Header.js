"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IconBack } from "public/icons/ArrowBack";
import { IconX } from "public/icons/X";
import { IconDotMenu } from "public/icons/DotMenu";
import { MenuMobileContainer } from "../menu/lateral";
import { InputSearch } from "../inputSearch/InputSearch";

const DefaultComponent = ({ close, menu, onClick, handleOpenMenuMobile }) => {
  const router = useRouter();

  if (close) {
    return (
      <div className="w-10" onClick={onClick}>
        <IconBack size="h-[26px] w-[26px]" />
      </div>
    );
  }

  if (menu) {
    return (
      <div className="w-10" onClick={handleOpenMenuMobile}>
        <IconDotMenu size="h-[30px] w-[30px]" />
      </div>
    );
  }

  return (
    <div className="w-10" onClick={() => router.back()}>
      <IconBack size="h-[26px] w-[26px]" />
    </div>
  );
};

export const Header = ({
  children,
  divider,
  title = "",
  titleComponent = <>Titulo Padrão</>,
  close = false,
  menu = false,
  onClick,
  _isNumeric,
  setInputText,
  formSubmit,
}) => {
  const [searchFull, setSearchFull] = useState(false);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const handleOpenMenuMobile = () => {
    setOpenMenuMobile(!openMenuMobile);
  };

  const handleFormSubmit = () => {
    formSubmit();
  };

  return (
    <header id="Header" className="fixed inset-x-0 w-full z-10">
      <div className="flex justify-center  h-14">
        <div
          className={`flex px-2 max-w-[768px] w-full bg-[var(--foreground)] ${
            divider && "shadow-md"
          }`}
        >
          <div className="w-full flex gap-3 items-center">
            <div className="w-6">
              <DefaultComponent
              close={close}
              menu={menu}
              handleOpenMenuMobile={handleOpenMenuMobile}
              onClick={onClick}
            />
            </div>
            <div className="flex justify-between items-center w-full">
              <span className="text-md font-bold">
                {!searchFull && (title.length ? title : titleComponent)}
              </span>
              {setInputText ? (
                <InputSearch
                  _isNumeric={_isNumeric}
                  handleFormSubmit={handleFormSubmit}
                  setInputText={setInputText}
                  setSearchFull={setSearchFull}
                  searchFull={searchFull}
                  mini
                />
              ): <a></a>}
            </div>
            <div className="items-center ">{children}</div>
          </div>
        </div>
      </div>
      {menu && (
        <MenuMobileContainer
          handleOpenModal={handleOpenMenuMobile}
          openModal={openMenuMobile}
        />
      )}
    </header>
  );
};
