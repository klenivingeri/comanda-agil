"use client";
import { InputSearch } from "@/components/input/inputSearch";
import { Container } from "@/components/layout/Container";
import { Content } from "@/components/layout/Content";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { useEffect, useState } from "react";
import { ItemList } from "./ItemList";

export default function Atendimento() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputText, setInputText] = useState("");

  const criarComanda = async () => {
    const res = await fetch(`/api/items?id=test`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const itemsDaComanda = await res.json();

    setItems(itemsDaComanda.records);
    setIsLoading(false);
  };

  useEffect(() => {
    criarComanda();
  }, []);

  return (
    <Container>
      <Header>
        <div className="flex flex-col w-full gap-2">
          <div className="w-full grid grid-cols-12 px-2">
            <div className="col-span-1 flex items-center"> 123 </div>
            <div className="col-span-10 flex items-center">
              <div className="w-full flex justify-center">Cardapio</div>
            </div>
            <div className="col-span-1 flex items-center justify-end">
              perfil
            </div>
          </div>
          <div className="w-full grid grid-cols-12 px-2">
            <div className="col-span-11 flex items-center">
              <InputSearch setInputText={setInputText} />
            </div>
            <div className="col-span-1 flex items-center justify-end">
              perfil
            </div>
          </div>
        </div>
      </Header>
      <div className="mt-[80px] mb-[50px] flex-1 flex flex-col">
        <Content isLoading={isLoading}>
          <ItemList items={items} inputText={inputText} />
        </Content>
      </div>
      <Footer>Test de Footer fixo</Footer>
    </Container>
  );
}
