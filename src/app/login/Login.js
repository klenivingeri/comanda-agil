"use client";
import React, { useState } from "react";

import { Container } from "../../components/layout/Container";
import { Content } from "../../components/layout/Content";
import { Button } from "../../components/button/Button";

export default function Login({ store }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert("Login feito!");
      window.location.href = "/comandas";
    } else {
      alert("Login ou senha inválidos");
    }
  }

  return (
    <Container>
      <div className="flex-1 flex flex-col">
        <Content padding="-">
          <div className="w-full h-full flex flex-col justify-between bg-black">
            <div className="text-5xl flex justify-center items-center text-white h-[20%] ">
              Login
            </div>
            <div className="h-[80%] rounded-tl-[100px] bg-white">
              <div className="relative w-full h-full flex justify-center items-center">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col justify-center items-center gap-2 relative"
                >
                  <input
                    type="email"
                    className="w-full pl-5 pr-10 py-2 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--button-default)] focus:border-[var(--button-focus)] outline-none bg-[var(--input-default)] text-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                  <input
                    type="password"
                    value={password}
                    className="w-full pl-5 pr-10 py-2 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--button-default)] focus:border-[var(--button-focus)] outline-none bg-[var(--input-default)] text-black"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                  />
                  <Button type="submit">Entrar</Button>
                </form>
              </div>
            </div>
          </div>
        </Content>
      </div>
    </Container>
  );
}
