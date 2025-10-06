"use client";
import { useState, useEffect } from "react";
import { useConfig } from "../../app/context/ConfigContext";
import { isEmpty } from "../../app/utils/empty";
import Menu from "src/components/menu/lateral/Menu";

const ContainerStyle = ({ children }) => {
  return (
    <div
      className={`relative flex min-h-screen h-full w-full flex-1 bg-[var(--foreground)]`}
    >
      {children}
    </div>
  );
};

export default function Caixa() {
  const { _menu } = useConfig();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [themeCurrent, setThemeCurrent] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    _menu.get();
    const savedTheme = localStorage.getItem("theme");
    setThemeCurrent(savedTheme);
  }, []);

  useEffect(() => {
    if (!isEmpty(_menu.all)) {
      setMenuItems(_menu.all);
    }
  }, [_menu.all]);

  return (
    <ContainerStyle>
      <div className="w-[500px] bg-amber-700 flex justify-end">
        <Menu menuItems={menuItems} />
      </div>
      <div> batata doc</div>
    </ContainerStyle>
  );
}
