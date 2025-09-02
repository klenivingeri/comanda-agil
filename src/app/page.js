import React from "react";

import { Container } from "../components/layout/Container";
import { Content } from "../components/layout/Content";
import Link from "next/link";

export default function Home() {
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
                <Link
                  href="/comandas"
                  className="text-white shadow-sm flex justify-center font-bold py-3 px-4 rounded-3xl w-full m-2 bg-black hover:bg-[var(--buttonHover)]"
                >
                  <span className="">Iniciar</span>
                </Link>
              </div>
            </div>
          </div>
        </Content>
      </div>
    </Container>
  );
}
