"use client";
import React, { useState } from "react";

import { Container } from "src/components/layout/Container";
import { Content } from "src/components/layout/Content";
import { Button } from "src/components/button/Button";
import { Loading } from "src/components/loading/Loading";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      window.location.href = "/comandas";
    } else if (email.trim() !== "" && password.trim() !== "") {
      setError(true);
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <div className="flex-1 flex flex-col">
        <Content padding="-">
          <div className="relative w-full h-full flex justify-center items-center ">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col rounded-sm bg-white p-10  mb-4  w-80 justify-center items-center gap-2 relative font-bold"
            >
              <div className="flex flex-col justify-center items-center text-gray-500 mb-6">
                <div className="flex text-4xl ">
                  <span className="text-[var(--logo1)]">Comanda</span>
                  <span className="text-[var(--logo2)]">Go</span>
                </div>
                <span className="text-sm font-extralight">
                  Gestão de Pedidos Simplificada
                </span>
              </div>
              <input
                type="email"
                className="w-full text-center placeholder:text-center placeholder:font-bold py-2 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--button-default)] focus:border-[var(--button-focus)] outline-none bg-[var(--input-default)] text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                type="password"
                value={password}
                className="w-full mb-1 text-center placeholder:text-center placeholder:font-bold py-2 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--button-default)] focus:border-[var(--button-focus)] outline-none bg-[var(--input-default)] text-black"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
              />
              {error && (
                <p className="mt-1 text-sm text-red-500">
                  Algo errado não esta certo, tente novamente.
                </p>
              )}
              <Button type="submit">
                {!isLoading ? (
                  "Entrar"
                ) : (
                  <Loading isLoading={isLoading} style="style3" />
                )}
              </Button>
            </form>
          </div>
        </Content>
      </div>
    </Container>
  );
}
