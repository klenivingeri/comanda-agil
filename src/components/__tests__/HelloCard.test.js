import React from "react";
import { render, screen } from "@testing-library/react";
import HelloCard from "../HelloCard";

test("exibe a saudação com o nome", () => {
  render(<HelloCard name="Joãozin" />);
  expect(screen.getByText(/Olá Joãozin!/i)).toBeInTheDocument();
});
