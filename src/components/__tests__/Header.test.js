import React from "react";
import { render, screen } from "@testing-library/react";

import { Header } from "../layout/Header";

test("exibe a saudação com o nome", () => {
  render(<Header>Olá Joãozin! </Header>);
  expect(screen.getByText(/Olá Joãozin!/i)).toBeInTheDocument();
});
