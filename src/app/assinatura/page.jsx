"use client";
import { useEffect, useState } from "react";
import { Container } from "src/components/layout/Container";
import { Content } from "src/components/layout/Content";
import { Header } from "src/components/layout/Header";
import { Loading } from "src/components/loading/Loading";

export default function Assinatura() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAwait, setIsAwait] = useState(false);
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
        <div className="flex w-full flex-col items-center ">
          {signs?.map(sign => <div key={sign.id}
            className="flex border-1 border-[var(--button-default)] opacity-0 mt-10 animate-fade-in flex-col bg-[var(--fore-back)] rounded-3xl gap-4 shadow-xl p-4 mb-4 relative font-normal"
            style={{
              animationDelay: `${0.01}s`,
              animationFillMode: "forwards",
            }}
          >
            <div className="my-2 flex flex-col items-center gap-2 ">
              <div className="text-4xl font-bold tracking-tight">
                <span className="text-gray-900">Comanda</span>
                <span className="text-[var(--button-default)]">Go</span>
              </div>
              <p className="text-xs font-normal text-gray-500">
                Gestão de Pedidos Simplificada
              </p>

              <ul className="mt-6 text-sm text-gray-600">
                <li className="my-2">
                  <span className="text-[var(--button-default)] mr-2 font-bold">
                    ✓
                  </span>
                  Acesso em celulares, tablets e computadores.
                </li>
                <li className="my-2">
                  <span className="text-[var(--button-default)] mr-2 font-bold">
                    ✓
                  </span>
                  Controle pedidos e pagamento em um só lugar.
                </li>
                <li className="my-2">
                  <span className="text-[var(--button-default)]  mr-2 font-bold">
                    ✓
                  </span>
                  Pedidos claros e sem rasuras.
                </li>

                <li className="my-2">
                  <span className="text-[var(--button-default)] mr-2 font-bold">
                    ✓
                  </span>
                  Acompanhe as vendas, pedidos, colaboradores, tudo de forma clara e simples.
                </li>
                <li className="my-2">
                  <span className="text-[var(--button-default)] mr-2 font-bold">
                    ✓
                  </span>
                  Motive sua equipe com metas e rankings de desempenho.
                </li>
                <li className="my-2">
                  <span className="text-[var(--button-default)] mr-2 font-bold">
                    ✓
                  </span>
                  Clientes podem visualizar suas comandas
                </li>
              </ul>
              <h1 className="text-5xl font-semibold text-[var(--button-default)] mt-5">R$ 16,99</h1>
              <p className="font-medium my-2">
                Acesso a conteúdo exclusivos e muito mais.
              </p>
              <a
                onClick={() => setIsAwait(true)}
                href={sign.init_point}
                className="h-12 w-50 mt-1 relative font-bold rounded-lg shadow-sm transition-all duration-70 ease-in-out text-white bg-gradient-to-br from-[var(--button-hover)] to-[var(--button-default)] border-1 border-[var(--button-default)] will-change-transform will-change-background border-b-3 border-b-[var(--button-default)] cursor-pointer"
              >
                <div className="w-full h-full flex justify-center items-center">{!isAwait ? 'Assinar' :
                  <Loading isLoading={isAwait} style="style3" />}</div>
              </a>
            </div>
          </div>
          )}
          <div className="flex gap-2">
            <div className="p-2 rounded-full bg-[var(--button-default)] shadow-xl"></div>
            <div className="p-2 rounded-full bg-gray-500/30 shadow-xl"></div>
          </div>
        </div>

      </Content>
    </Container>
  );
}

