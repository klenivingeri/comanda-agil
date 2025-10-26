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
      <Header divider title="Ajuda" />
        <Content isLoading={isLoading} error={error}>
          <Construction />
        </Content>
    </Container>
  );
}
