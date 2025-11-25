import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { IconCommand } from "public/icons/Command";
import { IconGear } from "public/icons/Gear";
import { IconMoney } from "public/icons/Money";
import { IconPercent } from "public/icons/Percent";
import { IconShoppingCart } from "public/icons/ShoppingCart";
import { IconUsers } from "public/icons/User";
import { IconCreate } from "public/icons/Create";
import { IconSearch } from "public/icons/Search";
import { IconChart } from "public/icons/Chart";
import { IconCompany } from "public/icons/Company";
import { IconGraphic } from "public/icons/Graphic";
import { IconExit } from "public/icons/Exit";
import { useCleaningTrigger } from "src/app/context/CleaningContext";

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
  IconCompany: <IconCompany size="h-[30px] w-[30px]" />,
  IconGraphic: <IconGraphic size="h-[28px] w-[28px]" />,
  IconExit: <IconExit size="h-[28px] w-[28px]" />,
};

const Menu = ({ menu }) => {
  const router = useRouter();

  const { logout } = useCleaningTrigger();
  const [activeLink, setActiveLink] = useState("");
  const [subActiveLink, setSubActiveLink] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathParts = window.location.pathname.split("/").filter(Boolean);

      if (pathParts.length > 0) {
        setActiveLink("/" + pathParts[0]);
      }

      if (pathParts.length > 1) {
        setSubActiveLink("/" + pathParts.join("/"));
        setOpenDropdown("/" + pathParts[0]); // abre o dropdown automaticamente
      }
    }
  }, []);

  const toggleDropdown = (path) => {
    setOpenDropdown(openDropdown === path ? null : path);
  };

  const handleExit = () => {
    logout();
    router.push('/login');
  }

  return (
    <nav>
      <ul className="list-none p-0 py-2 m-0">
        {menu.all.map((item) => (
          <li key={item.path} className="mb-2">
            {item.sublink ? (
              <div
                className={`flex items-center gap-5 p-2 rounded cursor-pointer transition-colors ${
                  activeLink === item.path
                    ? "bg-[var(--button-default)] font-bold text-[var(--text-menu)]/50"
                    : "hover:bg-[var(--button-hover)] hover:text-[var(--text-menu)]"
                }`}
                onClick={() => toggleDropdown(item.path)}
              >
                <span className="pl-6">{icons[item.icon]}</span>
                {item.title}
                <span className="ml-auto pr-6">
                  {openDropdown === item.path ? "▲" : "▼"}
                </span>
              </div>
            ) : (
              <Link
                href={item.path}
                className={`flex items-center gap-5 p-2 rounded cursor-pointer transition-colors ${
                  activeLink === item.path
                    ? "bg-[var(--button-default)] font-bold text-[var(--text-menu)]"
                    : "hover:bg-[var(--button-hover)] hover:text-[var(--text-menu)]"
                }`}
              >
                <span className="pl-6">{icons[item.icon]}</span>
                {item.title}
              </Link>
            )}

            {item.sublink && openDropdown === item.path && (
              <ul className="list-none mt-1">
                {item.sublink.map((sub) => (
                  <li key={sub.path}>
                    <Link
                      href={item.path + sub.path}
                      className={`flex pl-18 items-center p-1.5 rounded transition-colors ${
                        subActiveLink === item.path + sub.path
                          ? "bg-[var(--button-hover)] font-bold text-[var(--text-menu)]/50 hover:text-[var(--text-menu)]"
                          : "hover:bg-[var(--button-hover)]/50 hover:text-[var(--text-menu)]"
                      }`}
                    >
                      <span className="mr-2">{icons[sub.icon]}</span>
                      {sub.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        <li onClick={() => {}} className="mb-2">
          <a
            onClick={handleExit}
            className={`flex items-center gap-5 p-2 rounded cursor-pointer transition-colors hover:bg-[var(--button-hover)]`}
          >
            <span className="pl-6">{icons["IconExit"]}</span>Sair
          </a>
        </li>
      </ul>
      <div id="version" className="text-[12px] ml-10 pb-2 mb-5 text-gray-500">
        version: 0.0.10
      </div>
    </nav>
  );
};

export default Menu;
