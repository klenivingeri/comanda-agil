"use client";
import { useEffect, useState } from "react";
import { Container } from "src/components/layout/Container";
import { Content } from "src/components/layout/Content";
import { Header } from "src/components/layout/Header";
import { Construction } from "src/components/construction";
import { ButtonContainer } from "src/components/button";

export default function Assinatura() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signs, setSigns] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const res = await fetch(`/api/assinatura`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const signRest = await res?.json();

      setSigns(signRest.records)
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Header divider title="Assinatura" />
      <Content isLoading={isLoading} error={error}>
        <div className="flex w-full flex-col items-center">
        {signs?.map(sign => <div key={sign.id}
          className="flex opacity-0 mt-10 animate-fade-in flex-col bg-[var(--fore-back)] rounded-3xl gap-4 shadow-xl p-4 mb-4 relative font-normal"
          style={{
            animationDelay: `${0.01}s`,
            animationFillMode: "forwards",
          }}
        >
          <div className="my-2 flex flex-col items-center gap-2 w-70">
            <h1 className="text-4xl font-medium">ASSINATURA</h1> 
            <h1 className="text-5xl font-semibold">R$ 16,99</h1> 
            <p className=" font-medium my-2">
            Acesso a conteúdo<br/> exclusivo e recursos.
            </p>
                <ButtonContainer
                  href={sign.init_point}
                  hFull="h-12"
                  wFull="w-50"
                  margin="mt-1"
                >
                  Assinar
            </ButtonContainer>
            
          </div>
        </div>
        )}
        </div>

      </Content>
    </Container>
  );
}
