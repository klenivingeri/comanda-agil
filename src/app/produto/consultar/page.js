"use client";
import { Container } from "@/components/layout/Container";
import { Content } from "@/components/layout/Content";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { useEffect, useState } from "react";

export default function Atendimento() {
  const [items, setItems] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const criarComanda = async () => {
    const res = await fetch(`/api/items?id=test`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const itemsDaComanda = await res.json();

    setItems(itemsDaComanda);
    setIsLoading(false);
  };

  useEffect(() => {
    criarComanda();
  }, []);

  return (
    <Container>
      <Header>Consultar</Header>
      <div className="mt-[50px] mb-[50px]">
        <Content isLoading={isLoading} />
      </div>
      <Footer>Test de Footer fixo</Footer>
    </Container>
  );
}
