"use client";
import React from "react";

import { Container } from "../components/layout/Container";
import { Content } from "../components/layout/Content";
import Link from "next/link";
import { Button } from "src/components/button/Button";

export default function Home() {
  return (
    <Container>
      <div className="flex-1 flex flex-col">
        <Content padding="-">
          <div className="w-full h-full flex flex-col justify-between bg-black">
            <div className="text-5xl flex justify-center items-center text-white h-[20%] ">
              Pagina inicial
            </div>
            <div className="h-[80%] rounded-tl-[100px] bg-white">
              <div className="relative w-full h-full flex justify-center items-center">
                <Button href="/login/smartcommand">
                  <span className="">Ir para area de login</span>
                </Button>
              </div>
            </div>
          </div>
        </Content>
      </div>
    </Container>
  );
}
