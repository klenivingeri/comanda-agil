import React from "react";
import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

// Mock para o useRouter, já que o DefaultComponent dentro do Header o utiliza.
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
}));

// Mock para os contextos utilizados pelo MenuMobileContainer
jest.mock("src/app/context/MenuContext", () => ({
  useMenu: () => ({
    _menu: { all: [] }, // Fornece um valor padrão para o menu
  }),
}));

jest.mock("src/app/context/UserContext", () => ({
  useUserConfig: () => ({
    _user: { all: [{ name: "Usuário Teste" }] }, // Fornece um valor padrão para o usuário
  }),
}));

test("exibe o título da página", () => {
  render(<Header title="Titulo da pagina" menu={true} />);
  expect(screen.getByText(/Titulo da pagina/i)).toBeInTheDocument();
});
