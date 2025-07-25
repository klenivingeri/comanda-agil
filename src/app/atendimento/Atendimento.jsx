"use client";
import { useComanda } from "../context/ComandaContext";

export default function Atendimento() {
  const { comanda, setComanda } = useComanda();

  // Exemplo: criar nova comanda
  const criarComanda = async () => {
    const res = await fetch(`/api/comandas/${comanda.id}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: nomeItem }),
    });
    setComanda(novaComanda);
  };

  return (
    <section>
      {!comanda ? (
        <button onClick={criarComanda}>Abrir nova comanda</button>
      ) : (
        <>
          <h2>Comanda #{comanda.id}</h2>
        </>
      )}
    </section>
  );
}
