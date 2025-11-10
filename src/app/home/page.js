"use client";
import { IconCode } from "public/icons/Codes";
import { IconCommand } from "public/icons/Command";
import { IconSearch } from "public/icons/Search";
import { useEffect, useState } from "react";
import { ButtonContainer } from "src/components/button";
import { Input } from "src/components/form/FormComponents";
import { Container } from "src/components/layout/Container";
import { Content } from "src/components/layout/Content";
import { Header } from "src/components/layout/Header";

export default function Empresa() {
  const [error, setError] = useState(false);
  const [code, setCode] = useState("");
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    const customer = localStorage.getItem("customer");
    setCustomer(JSON.parse(customer));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    alert('Em construção')
  }
  return (
    <Container>
      <Header divider menu title="Bem-vindo" />
      <Content isLoading={!customer[0]?.name} error={error}>
        <div
          className="flex w-full opacity-0 animate-fade-in flex-col bg-white rounded-3xl gap-4 shadow-xl p-4 mb-4 relative font-normal"
          style={{
            animationDelay: `${0.01}s`,
            animationFillMode: "forwards",
          }}
        >
          <div className="my-2">
            <h1 className="text-4xl font-medium">{`Olá, ${
              customer[0]?.name || ""
            } :)`}</h1>
            <p className="text-[var(--text-default)]/70 font-medium mt-2">
              Sua produtividade começa aqui.
            </p>
          </div>

          <h3 className="font-medium text-xl">Pesquise por suas comandas</h3>
          <Input
            name="Código da comanda"
            id="code"
            setValue={setCode}
            placeholder="Código da comanda"
            type="tel"
            error={code.trim() === ""}
            value={code}
            icon={<IconCode size="h-[20px] w-[20px]" />}
          />

          <div className="flex w-full gap-4">
            <ButtonContainer onClick={handleSubmit} margin="mt-1">
              <span className="pl-1 flex items-center gap-2">
                <IconSearch size="h-[32px] w-[32px]" /> Localizar
              </span>
            </ButtonContainer>
            <ButtonContainer href="/comandas" margin="mt-1">
              <span className="pl-1 flex items-center gap-2">
                <IconCommand size="h-[32px] w-[32px]" /> Ver todas
              </span>
            </ButtonContainer>
          </div>
        </div>
      </Content>
    </Container>
  );
}
