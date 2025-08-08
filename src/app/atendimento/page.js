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

  const [isPinging, setIsPinging] = useState(false);

  const handleButtonClick = () => {
    setIsPinging(true);
    setTimeout(() => setIsPinging(false), 500); // dura ~0.5s, ajuste conforme necessário
  };

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
      <Footer>
        <div className="flex justify-center items-center w-full">
          <div className="relative w-full flex justify-center">
            {isPinging && (
              <span className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <span className="w-full h-full rounded-md bg-blue-400 opacity-50 animate-ping"></span>
              </span>
            )}
            <button
              className="p-2 text-white mx-2 w-full rounded-lg border-t-2 border-b-4 border-t-blue-300 bg-blue-400 border-b-blue-500 relative z-10"
              onClick={handleButtonClick}
            >
              LANÇAR ITEMS NA COMANDA
            </button>
          </div>
        </div>
      </Footer>
    </Container>
  );
}
