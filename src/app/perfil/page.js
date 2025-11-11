"use client";
import { useState } from "react";
import { Container } from "src/components/layout/Container";
import { Content } from "src/components/layout/Content";
import { Header } from "src/components/layout/Header";
import { Construction } from "src/components/construction";
import { ButtonContainer } from "src/components/button";
import { IconEdit } from "public/icons/Edit";

export default function Perfil() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = async () => {
    const res = await fetch("/api/comandas/user-status", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <Container>
      <Header divider title="Perfil" />
      <Content isLoading={isLoading} error={error}>
        <div className="col-span-10 flex justify-center items-center pt-5 pl-5 flex-col w-full mr">
          <div className="rounded-full shadow-lg p-[1px] mb-4">
            <div className="bg-cover bg-center rounded-full h-20 w-20 shadow-sm bg-[url(https://uploads.metropoles.com/wp-content/uploads/2023/10/26123632/Design-sem-nome-26-29.jpg)]"></div>
          </div>
          <span className="px-2 shadow-2xl font-bold ">Fulano</span>
          <span className="text-sm px-2 shadow-2xl text-gray-500">
            Por aqui desde outubro de 2015
          </span>
        </div>
        <div className="bg-[var(--fore-back)] w-full p-4  rounded-lg shadow-lg mt-4">
          <p className="font-bold">Estatísticas</p>
          <div className="grid grid-cols-12 gap-2">
            <div className="relative col-span-6 shadow-lg rounded-md pl-14 py-2">
              <p className="font-bold text-lg">0</p>
              <p className="text-sm font-medium text-[var(--text-default)]/50">
                Atendiemento
              </p>
              <span className="absolute top-5 left-4 ">
                <IconEdit size="h-[23px] w-[23px]" />
              </span>
            </div>
            <div className="relative col-span-6 shadow-lg rounded-md pl-14 py-2">
              <p className="font-bold text-lg">0</p>
              <p className="text-sm font-medium text-[var(--text-default)]/50">
                Itens vendidos
              </p>
              <span className="absolute top-5 left-4 ">
                <IconEdit size="h-[23px] w-[23px]" />
              </span>
            </div>
            <div className="relative col-span-6 shadow-lg rounded-md pl-14 py-2">
              <p className="font-bold text-lg">0</p>
              <p className="text-sm font-medium text-[var(--text-default)]/50">
                Mais vendito
              </p>
              <span className="absolute top-5 left-4 ">
                <IconEdit size="h-[23px] w-[23px]" />
              </span>
            </div>
            <div className="relative col-span-6 shadow-lg rounded-md pl-14 py-2">
              <p className="font-bold text-lg">0</p>
              <p className="text-sm font-medium text-[var(--text-default)]/50">
                Pódios
              </p>
              <span className="absolute top-5 left-4 ">
                <IconEdit size="h-[23px] w-[23px]" />
              </span>
            </div>
          </div>

          <p className="font-bold mb-3 mt-4 ">Records</p>
          <div className="grid grid-cols-12 gap-2">
            <div className="relative col-span-6 shadow-lg rounded-md px-4 py-2">
              <p className="font-bold text-sm mb-1">Atendimeneto</p>
              <div className="flex justify-between text-sm text-[var(--text-default)]/50 ">
                <div>Diario</div>
                <div> 0</div>
              </div>
              <div className="flex justify-between text-sm text-[var(--text-default)]/50 ">
                <div>Semanal</div>
                <div> 0</div>
              </div>
              <div className="flex justify-between text-sm text-[var(--text-default)]/50 ">
                <div>Mensal</div>
                <div> 0</div>
              </div>
              <div className="flex justify-between text-sm text-[var(--text-default)]/50 ">
                <div>Anual</div>
                <div> 0</div>
              </div>
            </div>
            <div className="relative col-span-6 shadow-lg rounded-md px-4 py-2">
              <p className="font-bold text-sm mb-1">Itens vendidos</p>
              <div className="flex justify-between text-sm text-[var(--text-default)]/50 ">
                <div>Diario</div>
                <div> 0</div>
              </div>
              <div className="flex justify-between text-sm text-[var(--text-default)]/50 ">
                <div>Semanal</div>
                <div> 0</div>
              </div>
              <div className="flex justify-between text-sm text-[var(--text-default)]/50 ">
                <div>Mensal</div>
                <div> 0</div>
              </div>
              <div className="flex justify-between text-sm text-[var(--text-default)]/50 ">
                <div>Anual</div>
                <div> 0</div>
              </div>
            </div>
          </div>

          <p className="font-bold mb-3 mt-4">Raking atendimentos</p>
          <div className="grid grid-cols-12 gap-2">
            <div className="relative col-span-4 shadow-lg rounded-md px-4 py-2">
              <p className="font-bold text-sm mb-1">Diario</p>
              <div className="flex justify-between text-sm text-[var(--text-default)]/50 ">
                <div>Diario</div>
                <div> 0</div>
              </div>
              <div className="flex justify-between text-sm text-[var(--text-default)]/50 ">
                <div>Semanal</div>
                <div> 0</div>
              </div>
              <div className="flex justify-between text-sm text-[var(--text-default)]/50 ">
                <div>Mensal</div>
                <div> 0</div>
              </div>
              <div className="flex justify-between text-sm text-[var(--text-default)]/50 ">
                <div>Anual</div>
                <div> 0</div>
              </div>
            </div>
            <div className="relative col-span-4 shadow-lg rounded-md px-4 py-2">
              <p className="font-bold text-sm mb-1">Semanal</p>
              <div className="flex justify-between text-sm text-[var(--text-default)]/50 ">
                <div>Diario</div>
                <div> 0</div>
              </div>
              <div className="flex justify-between text-sm text-[var(--text-default)]/50 ">
                <div>Semanal</div>
                <div> 0</div>
              </div>
              <div className="flex justify-between text-sm text-[var(--text-default)]/50 ">
                <div>Mensal</div>
                <div> 0</div>
              </div>
              <div className="flex justify-between text-sm text-[var(--text-default)]/50 ">
                <div>Anual</div>
                <div> 0</div>
              </div>
            </div>
            <div className="relative col-span-4 shadow-lg rounded-md px-4 py-2">
              <p className="font-bold text-sm mb-1">Mensal</p>
              <div className="flex justify-between text-sm text-[var(--text-default)]/50 ">
                <div>Diario</div>
                <div> 0</div>
              </div>
              <div className="flex justify-between text-sm text-[var(--text-default)]/50 ">
                <div>Semanal</div>
                <div> 0</div>
              </div>
              <div className="flex justify-between text-sm text-[var(--text-default)]/50 ">
                <div>Mensal</div>
                <div> 0</div>
              </div>
              <div className="flex justify-between text-sm text-[var(--text-default)]/50 ">
                <div>Anual</div>
                <div> 0</div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Container>
  );
}
