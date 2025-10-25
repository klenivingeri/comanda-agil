import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { InputSearch } from "../InputSearch";

jest.mock("public/icons/MagnifyingGlass", () => ({
  MagnifyingGlass: (props) => <div data-testid="magnifying-glass" {...props} />,
}));
jest.mock("public/icons/KeyBoard", () => ({
  IconKeyBoard: (props) => <div data-testid="keyboard-icon" {...props} />,
}));
jest.mock("public/icons/KeyBoardNumeric", () => ({
  IconKeyBoardNumeric: (props) => (
    <div data-testid="keyboard-numeric-icon" {...props} />
  ),
}));
jest.mock("public/icons/X", () => ({
  IconX: (props) => <div data-testid="x-icon" {...props} />,
}));

describe("Componente InputSearch", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const mockSetInputText = jest.fn();
  const mockSetSearchFull = jest.fn();
  const mockHandleFormSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Deve renderizar o campo de input", () => {
    render(
      <InputSearch
        setInputText={mockSetInputText}
        setSearchFull={mockSetSearchFull}
        handleFormSubmit={mockHandleFormSubmit}
      />
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("Deve lidar com a entrada de texto com debounce", async () => {
    render(
      <InputSearch
        setInputText={mockSetInputText}
        setSearchFull={mockSetSearchFull}
        handleFormSubmit={mockHandleFormSubmit}
        searchFull={true}
      />
    );

    const input = screen.getByPlaceholderText("Filtrar...");
    fireEvent.change(input, { target: { value: "test" } });

    expect(input.value).toBe("test");
    expect(mockSetInputText).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(mockSetInputText).toHaveBeenCalledWith("test");
    });
  });

  it("Deve limpar o texto quando o botão de limpar for clicado", () => {
    render(
      <InputSearch
        setInputText={mockSetInputText}
        setSearchFull={mockSetSearchFull}
        handleFormSubmit={mockHandleFormSubmit}
        searchFull={true}
      />
    );

    const input = screen.getByPlaceholderText("Filtrar...");
    fireEvent.change(input, { target: { value: "some text" } });
    expect(input.value).toBe("some text");

    const clearButton = screen.getByTestId("x-icon").parentElement;
    fireEvent.click(clearButton);

    expect(input.value).toBe("");
    expect(mockSetInputText).toHaveBeenCalledWith("");
  });

  it("Deve chamar handleFormSubmit ao submeter o formulário", () => {
    render(
      <InputSearch
        setInputText={mockSetInputText}
        setSearchFull={mockSetSearchFull}
        handleFormSubmit={mockHandleFormSubmit}
      />
    );

    const form = screen.getByRole("textbox").closest("form");
    fireEvent.submit(form);

    expect(mockHandleFormSubmit).toHaveBeenCalledTimes(1);
  });

  it("Deve expandir e recolher quando a propriedade 'mini' for verdadeira", () => {
    const { rerender } = render(
      <InputSearch mini={true} searchFull={false} setSearchFull={mockSetSearchFull} />
    );

    const form = screen.getByRole("textbox").closest("form");
    expect(form).toHaveClass("w-11");

    rerender(<InputSearch mini={true} searchFull={true} setSearchFull={mockSetSearchFull} />);

    expect(form).toHaveClass("w-full");
    expect(form).not.toHaveClass("w-11");
  });
});
