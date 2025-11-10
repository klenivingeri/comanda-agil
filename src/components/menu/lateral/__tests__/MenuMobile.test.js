import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { MenuMobile } from "../MenuMobile";
const mockRouterBack = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ back: mockRouterBack }),
}));
jest.mock("src/app/context/CleaningContext", () => ({
  useCleaningTrigger: () => ({
    triggerCleaning: jest.fn(),
  }),
}));

let store = {
  customer: JSON.stringify([{ name: "Usuário Teste" }]),
};

Object.defineProperty(global, "localStorage", {
  value: {
    getItem: jest.fn(function (key) {
      return store[key] || null;
    }),
  },
  writable: true,
});

test("exibe a saudação com o nome e expande o menu", () => {
  render(
    <MenuMobile
      handleOpenModal={() => {}}
      openModal={true}
      menu={{
        all: [
          {
            title: "Comandas",
            path: "/comandas",
            icon: "IconCommand",
          },
          {
            title: "Categoria",
            path: "/categoria",
            icon: "IconShoppingCart",
            sublink: [
              {
                title: "Cadastrar",
                path: "/cadastrar/create",
                icon: "IconCreate",
              },
              {
                title: "Consultar",
                path: "/consultar",
                icon: "IconSearch",
              },
              {
                title: "Relatório",
                path: "/relatorio",
                icon: "IconChart",
              },
            ],
          },
        ],
      }}
    ></MenuMobile>
  );
  expect(screen.getByText(/Usuário Teste/i)).toBeInTheDocument();
  expect(screen.getByText(/Comandas/i)).toBeInTheDocument();

  // Simula o clique no item "Categoria" para abrir o dropdown
  fireEvent.click(screen.getByText(/Categoria/i));

  // Agora verifica se o item do submenu está visível
  expect(screen.getByText(/Cadastrar/i)).toBeInTheDocument();
});
