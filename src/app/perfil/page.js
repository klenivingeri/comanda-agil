"use client";
import { useState } from "react";
import { Container } from "src/components/layout/Container";
import { Content } from "src/components/layout/Content";
import { Header } from "src/components/layout/Header";
import { Construction } from "src/components/construction";
import { ButtonContainer } from "src/components/button";

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
        <ButtonContainer onClick={handleFetch}>busca</ButtonContainer>
        <Construction />
      </Content>
    </Container>
  );
}
