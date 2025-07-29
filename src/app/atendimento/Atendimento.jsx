"use client";
import { useComanda } from "../context/ComandaContext";

export default function Atendimento() {
  const { comanda, setComanda } = useComanda();

  // Exemplo: criar nova comanda
  const criarComanda = async () => {
    const res = await fetch(`/api/itens`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const novaComanda = await res.json();

    console.log(novaComanda);
  };

  return (
    <section>
      {!comanda ? (
        <button onClick={criarComanda}>Abrir nova comanda</button>
      ) : (
        <>
          <button onClick={criarComanda}>Abrir nova comanda</button>
          <h2>Comanda #{comanda.id}</h2>
        </>
      )}
    </section>
  );
}
