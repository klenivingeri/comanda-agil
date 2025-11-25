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
          <div className="rounded-lg w-full shadow-lg h-30 flex justify-end items-end">

            <div className="">
                <div className="h-18 w-18 bg-red-100 rounded-full"></div>
            </div>
          </div>
        </Content>
    </Container>
  );
}
