"use client";
import { IconCommand } from "public/icons/Command";
import { useEffect, useState } from "react";
import { ButtonContainer } from "src/components/button";
import { Container } from "src/components/layout/Container";
import { Content } from "src/components/layout/Content";
import { Header } from "src/components/layout/Header";

export default function Empresa() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    const customer = localStorage.getItem("customer");
    setCustomer(JSON.parse(customer));
  }, []);

  return (
    <Container>
      <Header divider menu title={`Bem-vindo, ${customer[0]?.name || ""}`} />
      <Content isLoading={isLoading} error={error}>
        <ButtonContainer href="/comandas" hFull="h-22" margin="mt-1">
          <span className="pl-1 flex items-center gap-2">
            <IconCommand size="h-[32px] w-[32px]" /> IR PARA AS COMANDAS
          </span>
        </ButtonContainer>
      </Content>
    </Container>
  );
}
