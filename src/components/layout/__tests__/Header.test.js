import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "../Header";

// Mock dos ícones para facilitar a busca nos testes
jest.mock("public/icons/ArrowBack", () => ({
  IconBack: () => <div data-testid="icon-back">Voltar</div>,
}));

jest.mock("public/icons/X", () => ({
  IconX: () => <div data-testid="icon-close">Fechar</div>,
}));

jest.mock("public/icons/DotMenu", () => ({
  IconDotMenu: () => <div data-testid="icon-menu">Menu</div>,
}));

const mockRouterBack = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ back: mockRouterBack }),
}));

jest.mock("src/app/context/MenuContext", () => ({
  useMenu: () => ({
    _menu: { all: [], get: () => {} },
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

test("Exibe o título da página", () => {
  render(<Header title="Titulo da pagina" menu={true} />);
  expect(screen.getByText(/Titulo da pagina/i)).toBeInTheDocument();
});

test("Exibe o ícone de voltar por padrão e chama router.back ao clicar", () => {
  render(<Header />);
  const backButton = screen.getByTestId("icon-back");
  expect(backButton).toBeInTheDocument();

  fireEvent.click(backButton);
  expect(mockRouterBack).toHaveBeenCalledTimes(1);
});



test("Exibe o ícone de fechar e chama a função onClick ao ser clicado", () => {
  const mockOnClick = jest.fn();
  render(<Header close={true} onClick={mockOnClick} />);

  const closeButton = screen.getByTestId("icon-close");
  expect(closeButton).toBeInTheDocument();

  fireEvent.click(closeButton);
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});

test("abre o menu mobile ao clicar no ícone de menu", () => {
  render(<Header menu={true} />);

  fireEvent.click(screen.getByTestId("icon-menu"));
  expect(screen.getByText("Usuário Teste")).toBeInTheDocument();
});
