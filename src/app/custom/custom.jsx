"use client";
import { useComanda } from "../context/ConfigContext";

export default function Custom() {
  const { comanda, setComanda } = useComanda();

  // Exemplo: criar nova comanda
  const criarComanda = async () => {
    const res = await fetch(`/api/itens`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const novaComanda = await res.json();

  };

  return (
    <section>
      {!comanda ? (
        <button onClick={criarComanda}>Abrir nova comanda</button>
      ) : (
        <>
          <button onClick={criarComanda}>Abrir nova comanda</button>
          <h2 className="dark:bg-red-700 dark:text-black bg-amber-200 text-white">Comanda #{comanda.id}</h2>
        </>
      )}
    </section>
  );
}
