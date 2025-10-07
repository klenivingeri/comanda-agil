"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { isEmpty } from "../utils/empty";

export const ConfigContext = createContext();
const defaultValue = {
  hasVibrate: false,
  // outros defaults
};

export function ConfigProvider({ children }) {
  const [hasVibrate, setHasVibrate] = useState("off");
  const [commandSave, setcommandSave] = useState({ all: [], error: false, isLoading: true });
  const [itemSave, setItemSave] = useState({ all: [], error: false, isLoading: true });
  const [menuSave, setMenuSave] = useState({ all: [], error: false, isLoading: true });
  const [categorySave, setCategorySave] = useState({ all: [], error: false, isLoading: true });
  const [cleaningTrigger, setCleaningTrigger] = useState(false);

  const _handleCleaningTrigger = () => {
    sessionStorage.removeItem("items-command");
    setItemSave({ all: [], error: false, isLoading: true });
    sessionStorage.removeItem("menu");
    setMenuSave({ all: [], error: false, isLoading: true });
    sessionStorage.removeItem("categories");
    setCategorySave({ all: [], error: false, isLoading: true });

    setCleaningTrigger(!cleaningTrigger);
  }

  const getComandas = async () => {
    setcommandSave({ ...commandSave, isLoading: true });
    const res = await fetch(`/api/comandas`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const comanda = await res.json();

    if (isEmpty(comanda?.records)) {
      setcommandSave({ ...commandSave, error: true, isLoading: false });
      return;
    }

    setcommandSave({ all: comanda.records, error: false, isLoading: false });

  };

  const getItems = async () => {
    if (itemSave.all.length > 0) {
      return
    } else {
      setItemSave({ ...itemSave, loading: true });
      const res = await fetch(`/api/items`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const itemsDaComanda = await res.json();

      if (isEmpty(itemsDaComanda?.records)) {
        setItemSave({ all: [], error: true, isLoading: false });
        return;
      }
      sessionStorage.setItem("items-command", JSON.stringify(itemsDaComanda.records))
      setItemSave({ all: itemsDaComanda.records, error: false, isLoading: false });
    }

  };

  const getCategory = async () => {
    try {
      const res = await fetch(`/api/category`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const category = await res.json();

      setCategorySave({ all: category.records, error: false, isLoading: false });
      sessionStorage.setItem("categories", JSON.stringify(category.records));
    } catch (_) {
      setCategorySave({ all: [], error: true, isLoading: false });
    } finally {
    }
  };

  const getMenu = async () => {
    try {
      const res = await fetch(`/api/menu`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const menuItems = await res.json();

      setMenuSave({ all: menuItems.records, error: false, isLoading: false });
      sessionStorage.setItem("menu", JSON.stringify(menuItems.records));
    } catch (_) {
      setMenuSave({ all: [], error: true, isLoading: false });
    } finally {
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

    const savedItemsCommand = JSON.parse(sessionStorage.getItem("items-command"))
    if (savedItemsCommand?.length > 0) {
      setItemSave({ all: savedItemsCommand, error: false, isLoading: false });
    } else {
      getItems();
    }

    const savedCategory = JSON.parse(sessionStorage.getItem("categories"))
    if (savedCategory?.length > 0) {
      setCategorySave({ all: savedCategory, error: false, isLoading: false });
    } else {
      getCategory();
    }

    const savedMenu = JSON.parse(sessionStorage.getItem("menu"))
    if (!isEmpty(savedMenu)) {
      setMenuSave({ all: savedMenu, error: false, isLoading: false });
    } else {
      getMenu();
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
  }, [cleaningTrigger]);

  const _command = {
    get: getComandas,
    ...commandSave
  }

  const _item = {
    get: getItems,
    ...itemSave
  }
  getCategory
  const _menu = {
    get: getMenu,
    ...menuSave
  }

  const _category = {
    get: getCategory,
    ...categorySave
  }

  return (
    <ConfigContext.Provider value={{ _handleCleaningTrigger, handleVibrate, hasVibrate, _command, _item, _menu, _category }}>
      {children}
    </ConfigContext.Provider>
  );
}

export const useConfig = () => useContext(ConfigContext) || defaultValue