"use client";
import { InputSearch } from "@/components/input/inputSearch";
import { Container } from "@/components/layout/Container";
import { Content } from "@/components/layout/Content";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { useEffect, useState } from "react";
import { ItemList } from "./ItemList";
import { IconFilter, IconFilterX } from "../../../public/icons/Filter";
import { IconMenuList } from "../../../public/icons/MenuList";

export default function Atendimento() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [isFilter, setIsFilter] = useState(false);
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

  const handleFilter = () => {
    setIsFilter(!isFilter);
  };

  return (
    <Container>
      <Header>
        <div className="flex flex-col w-full gap-2">
          <div className="w-full grid grid-cols-12 px-2 h-[50px]">
            <div className="col-span-1 flex items-center pt-2">
              <div className="px-3 text-white rounded-3xl border-t-2 border-b-2 bg-[var(--button)]">
                123
              </div>
            </div>
            <div className="col-span-10 flex items-end">
              <div className="w-full flex justify-center">
                <span className="text-shadow-md text-2xl font-bold">
                  {" "}
                  Cardapio
                </span>
              </div>
            </div>
            <div className="col-span-1 flex items-end pt-1">
              <div className="h-[35px] w-[35px]  shadow-sm rounded-full bg-[url(https://yt3.googleusercontent.com/ytc/AIdro_nVCCXkptyc7S3f6cWhUf_VQc36D6wFeg679ckPMA=s900-c-k-c0x00ffffff-no-rj)]  bg-center bg-cover bg-no-repeat"></div>
            </div>
          </div>
          <div className="w-full grid grid-cols-12 px-2 gap-2">
            <div className="col-span-9 flex items-center">
              <InputSearch setInputText={setInputText} />
            </div>
            <div className="col-span-3 flex items-center justify-end">
              <div className="grid grid-cols-2 w-full h-full gap-2">
                <div className="col-span-1 flex justify-center items-center">
                  <button
                    onClick={handleFilter}
                    className="border-2 w-full text-white bg-[var(--button)] h-full rounded-md flex justify-center items-center"
                  >
                    {!isFilter ? (
                      <IconFilter size="h-[25px] w-[25px]" />
                    ) : (
                      <IconFilterX size="h-[25px] w-[25px]" />
                    )}
                  </button>
                </div>
                <div className="col-span-1  flex justify-center items-center">
                  <button className="border-2 w-full text-white bg-[var(--button)] h-full rounded-md flex justify-center items-center ">
                    <IconMenuList size="h-[25px] w-[25px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Header>
      <div className="mt-[90px] mb-[50px] flex-1 flex flex-col">
        <Content isLoading={isLoading}>
          <ItemList items={items} inputText={inputText} />
        </Content>
      </div>
      <Footer>
        <div className="flex justify-center items-center w-full">
          <div className="relative w-full flex justify-center items-center">
            <button
              className="relative overflow-hidden text-white font-bold py-2 px-4 rounded w-full m-2"
              onClick={handleButtonClick}
            >
              <span className="absolute inset-0 bg-[var(--button)] transition hover:brightness-90"></span>
              <span className="relative"> LANÇAR ITEMS NA COMANDA</span>
            </button>
          </div>
        </div>
      </Footer>
    </Container>
  );
}
