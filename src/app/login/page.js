"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { Container } from "src/components/layout/Container";
import { Content } from "src/components/layout/Content";
import { ButtonContainer } from "src/components/button";
import { Loading } from "src/components/loading/Loading";
import { IconUser } from "public/icons/User";
import { IconPassword } from "public/icons/Password";


const setCookie = (value) => {
  const date = new Date();
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
  const expires = date.toUTCString();
  const cookieString = `isUserActive=${value}; path=/; samesite=strict; max-age=604800; expires=${expires}; Secure;`;
  document.cookie = cookieString;
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    setIsLoading(true);

    if (email.trim() === "" || password.trim() === "") {
      setError(true);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const user = await res.json();
      if (user.success) {
        setCookie(true);
        localStorage.setItem("customer", JSON.stringify(user.records));
        router.push("/home");
      } else {
        setError(user.message);
        setIsLoading(false);
      }
    } catch (err) {
      setError('Algo errado não esta certo, tente novamente.');
      setIsLoading(false);
    }
  }

  const handleGoToHome = () => {
    setCookie(false);
    router.push("/");
  };

  return (
    <Container>
      <div className="flex-1 flex flex-col">
        <Content padding="-">
          <div className="relative w-full h-full flex justify-center items-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col bg-white rounded-3xl shadow-xl p-10 mb-4 w-90 justify-center items-center gap-2 relative font-normal"
            >
              <a
                onClick={handleGoToHome}
                className="flex flex-col justify-center items-center text-gray-500 mb-6 font-bold"
              >
                <div className="flex text-5xl tracking-tight">
                  <span className="text-[var(--logo1)]">Comanda</span>
                  <span className="text-[var(--button-default)]">Go</span>
                </div>
                <span className="text-sm font-extralight">
                  Gestão de Pedidos Simplificada
                </span>
              </a>
              <div className="relative w-full">
                <div className="absolute top-3.5 left-3 text-gray-500">
                  <IconUser size="h-[20px] w-[20px]" />
                </div>
                <input
                  type="email"
                  className="w-full ab pl-10 placeholder:font-extralight py-2 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--button-default)] focus:border-[var(--button-focus)] outline-none bg-[var(--input-default)] text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="relative w-full">
                <div className="absolute top-3.5 left-3 text-gray-500">
                  <IconPassword size="h-[20px] w-[20px]" />
                </div>
                <input
                  type="password"
                  value={password}
                  className="w-full pl-10  mb-2 placeholder:font-extralight py-2 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--button-default)] focus:border-[var(--button-focus)] outline-none bg-[var(--input-default)] text-black"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Senha"
                />
              </div>
              {error.length > 0 && (
                <p className="mb-1 text-sm text-red-500">
                  {error}
                </p>
              )}
              <ButtonContainer type="submit">
                {!isLoading ? (
                  "Entrar"
                ) : (
                  <Loading isLoading={isLoading} style="style3" />
                )}
              </ButtonContainer>
              <ButtonContainer
                style="buttonInline"
                margin="mt-2"
                href="/cadastrar-empresa"
              >
                Criar uma conta
              </ButtonContainer>
              <a onClick={handleGoToHome} className="text-black font-normal">
                {" "}
                Ir para pagina inicial
              </a>
            </form>
          </div>
        </Content>
      </div>
    </Container>
  );
}
