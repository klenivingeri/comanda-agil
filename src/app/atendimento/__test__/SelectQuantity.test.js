import React from "react";
import { render, screen } from "@testing-library/react";
import { SelectQuantity } from "../[uuid]/SelectQuantity";

test("renderiza botão de adicionar", () => {
  render(<SelectQuantity value={0} />);
  expect(screen.getByText("+")).toBeInTheDocument();
});

test("renderiza botão de remover quando value > 0", () => {
  render(<SelectQuantity value={2} />);
  expect(screen.getByText("-")).toBeInTheDocument();
  expect(screen.getByText("2")).toBeInTheDocument();
});
