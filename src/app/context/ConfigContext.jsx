"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { isEmpty } from "../utils/empty";

export const ConfigContext = createContext();


export function ConfigProvider({ children }) {
  const [hasVibrate, setHasVibrate] = useState("off");
  const [commandSave, setcommandSave] = useState({ all: [], error: false, isLoading: true });
  const [itemSave, setItemSave] = useState({ all: [], error: false, isLoading: true });

  const getComandas = async () => {
    setcommandSave({ ...commandSave, loading: true });
    const res = await fetch(`/api/comandas`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const comanda = await res.json();

    if (isEmpty(comanda?.records)) {
      setcommandSave({ ...commandSave, error: true });
      return;
    }

    setcommandSave({ all: comanda.records, error: false, loading: false });

  };

  const getItems = async () => {
    const savedItemsCommand = JSON.parse(localStorage.getItem("items-command"))

    if (savedItemsCommand?.length > 0) {
      setItemSave({ all: savedItemsCommand, error: false, loading: false });
    } else {
      setItemSave({ ...itemSave, loading: true });
      const res = await fetch(`/api/items`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const itemsDaComanda = await res.json();

      if (isEmpty(itemsDaComanda?.records)) {
        setItemSave({ ...itemsDaComanda, error: true });
        return;
      }
      localStorage.setItem("items-command", JSON.stringify(itemsDaComanda.records))
      setItemSave({ all: itemsDaComanda.records, error: false, loading: false });
    }

  };

  const handleVibrate = (vibrate) => {
    setHasVibrate(vibrate);
    localStorage.setItem("vibrate-button", vibrate);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedThemeButton = localStorage.getItem("theme-button");
    const savedVibrateButton = localStorage.getItem("vibrate-button");

    const savedItemsCommand = JSON.parse(localStorage.getItem("items-command"))

    if (savedItemsCommand?.length > 0) {
      setItemSave({ all: savedItemsCommand, error: false, loading: false });
    }

    const root = window.document.documentElement;

    if (savedTheme) {
      root.classList.add(savedTheme);
    }

    if (isEmpty(savedThemeButton)) {
      root.classList.add("btn-orange");
      localStorage.setItem("theme-button", "btn-orange");
    } else {
      root.classList.add(savedThemeButton);
    }

    if (!isEmpty(savedVibrateButton)) {
      setHasVibrate(savedVibrateButton);
    }
  }, []);

  const _command = {
    get: getComandas,
    ...commandSave
  }

  const _item = {
    get: getItems,
    ...itemSave
  }

  return (
    <ConfigContext.Provider value={{ handleVibrate, hasVibrate, _command, _item }}>
      {children}
    </ConfigContext.Provider>
  );
}

export const useConfig = () => useContext(ConfigContext);