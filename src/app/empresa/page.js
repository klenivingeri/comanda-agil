"use client";
import { useState } from "react";
import { Container } from "src/components/layout/Container";
import { Content } from "src/components/layout/Content";
import { Header } from "src/components/layout/Header";
import { Construction } from "src/components/construction";

export default function Empresa() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  return (
    <Container>
      <Header divider title="Empresa" />
      <Content isLoading={isLoading} error={error}>
        <div className="relative">
          <div
            className="rounded-lg shadow-sm w-full h-30 flex justify-end items-end w-[200px] h-[100px] bg-cover bg-top rounded-full"
            style={{
              backgroundImage: `url(https://www.comidaereceitas.com.br/wp-content/uploads/2008/08/Pastel-paulista-freepik-780x599.jpg)`,
            }}
          ></div>

          <div className="mt-[-40px] flex items-center">
            <div className="h-24 w-24 ml-4 bg-[var(--foreground)] rounded-full flex items-center justify-center">
              <div className="h-21 w-21 shadow-sm bg-red-100 rounded-full flex items-center justify-center ">
              </div>
            </div>
            <div className="mt-8 ml-3 text-2xl font-semibold">ComandaGo</div>
          </div>
        </div>
      </Content>
    </Container>
  );
}
