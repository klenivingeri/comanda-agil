"use client";
import { useEffect, useState } from "react";
import { ComandaProvider } from "../context/ConfigContext";
import Custom from "./custom";

export default function PaginaCustom() {
  const [isDark, setIsDark] = useState(false);

  // Carrega preferência do usuário ao iniciar
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setIsDark(true);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement; // <html>
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <ComandaProvider>
      <main>
        <h1>Página de atendimento</h1>
        <Custom />
        <button onClick={() => setIsDark(!isDark)}>
          {isDark ? "🌙 Escuro" : "☀️ Claro"}
        </button>
        <div className="">Comanda testando dark mode</div>
      </main>
    </ComandaProvider>
  );
}
