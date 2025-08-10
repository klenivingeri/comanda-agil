"use client";
import { useState, useEffect, Lin } from "react";
import { IconCommand } from "../../../../public/icons/Command";
import { IconGear } from "../../../../public/icons/Gear";
import { IconMoney } from "../../../../public/icons/Money";
import { IconPercent } from "../../../../public/icons/Percent";
import { IconShoppingCart } from "../../../../public/icons/ShoppingCart";
import { IconUsers } from "../../../../public/icons/User";
import { IconCreate } from "../../../../public/icons/Create";
import { IconSearch } from "../../../../public/icons/Search";
import { IconChart } from "../../../../public/icons/Chart";
import Link from "next/link";
import { menu } from "./constant";

const icons = {
  IconMoney: <IconMoney size="h-[30px] w-[30px]" />,
  IconCommand: <IconCommand size="h-[30px] w-[30px]" />,
  IconShoppingCart: <IconShoppingCart size="h-[30px] w-[30px]" />,
  IconGear: <IconGear size="h-30px] w-[30px]" />,
  IconUsers: <IconUsers size="h-[30px] w-[30px]" />,
  IconPercent: <IconPercent size="h-[30px] w-[30px]" />,
  IconCreate: <IconCreate size="h-[20px] w-[20px]" />,
  IconSearch: <IconSearch size="h-[20px] w-[20px]" />,
  IconChart: <IconChart size="h-[20px] w-[20px]" />,
};

const getIcons = (iconName) => icons[iconName];

const WrapperLink = ({
  text,
  path = "",
  children,
  h = "h-[60px]",
  w = "w-[60px]",
  handleActiveLink,
  isSublink,
  active,
  handleIsOpen = () => {},
}) => {
  return (
    <div className={`flex flex-col w-full items-end `}>
      <div className="relative flex items-center w-full justify-end group">
        <span
          className={` ${
            active
              ? "opacity-100 translate-x-[0px] "
              : "opacity-0 translate-x-[10px] "
          } mr-2 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-[0px]`}
        >
          {text}
        </span>
        <Link
          href={isSublink ? "" : path}
          className={`${
            active ? "bg-black text-white" : "bg-white text-black"
          } flex items-center justify-center rounded-[10px] ${h} ${w} hover:bg-black hover:text-white transition delay-100 duration-300 ease-in-out`}
          alt={text}
          onClick={() => {
            handleActiveLink(path, isSublink);
            handleIsOpen(isSublink, path);
          }}
        >
          {children}
        </Link>
      </div>
    </div>
  );
};

export const MenuLateral = () => {
  const [activeLink, setActiveLink] = useState("");
  const [subActiveLink, setSubActiveLink] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathParts = window.location.pathname.split("/").filter(Boolean);
      if (pathParts.length > 0) {
        setActiveLink("/" + pathParts[0]);
      }
      if (pathParts.length > 1) {
        setSubActiveLink("/" + pathParts[0] + "/" + pathParts[1]);
        setIsOpen(true);
      }
    }
  }, []);

  const handleActiveLink = (path, isSublink) => {
    if (!isSublink) {
      setActiveLink(path);
      setSubActiveLink("");
      return;
    }
    setActiveLink(path);
  };

  const handleIsOpen = (isSublink, path) => {
    if (isSublink && activeLink === path) {
      setIsOpen(!isOpen);
      return;
    }
    if (isSublink) {
      setIsOpen(true);
      return;
    }
    setIsOpen(false);
  };

  return (
    <div
      className="hidden md:flex fixed top-0 h-screen w-[200px] text-black"
      style={{ left: "calc(50% - 768px/2 - 200px)" }}
    >
      <nav className="flex flex-col h-full w-full gap-3 pr-3 items-end">
        <div id="logo">
          <img src="/assets/logo.png" height={50} width={50} />
        </div>
        {menu.map((m, idx) => (
          <div key={m.title + idx} className="w-full">
            <WrapperLink
              text={m.title}
              path={m.path}
              isSublink={!!m?.sublink}
              handleActiveLink={handleActiveLink}
              activeLink={activeLink}
              active={activeLink === m.path}
              handleIsOpen={handleIsOpen}
            >
              {getIcons(m.icon)}
            </WrapperLink>

            {isOpen &&
              activeLink === m.path &&
              Array.isArray(m.sublink) &&
              m.sublink.map((s, subIdx) => (
                <div
                  key={s.title + subIdx}
                  className="flex flex-col w-full pr-3 mt-2"
                >
                  <WrapperLink
                    text={s.title}
                    path={`${m.path}${s.path}`}
                    h="h-[40px]"
                    w="w-[40px]"
                    handleActiveLink={setSubActiveLink}
                    activeLink={subActiveLink}
                    active={subActiveLink === `${m.path}${s.path}`}
                  >
                    {getIcons(s.icon)}
                  </WrapperLink>
                </div>
              ))}
          </div>
        ))}
      </nav>
    </div>
  );
};
