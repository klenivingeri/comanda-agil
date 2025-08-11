import React from "react";
import { render, screen } from "@testing-library/react";
import { ItemList } from "../ItemList";

const items = [
  {
    id: "1",
    name: "Coca-Cola",
    price: 5.5,
    type: "bebida",
    typeLabel: "Bebidas",
  },
  { id: "2", name: "Água", price: 3.0, type: "bebida", typeLabel: "Bebidas" },
];

test("renderiza categorias e itens", () => {
  render(
    <ItemList
      items={items}
      inputText=""
      handleRemoveItemsSelected={() => {}}
      handleUpdateItemsSelected={() => {}}
    />
  );
  expect(screen.getByText(/Bebidas/i)).toBeInTheDocument();
  expect(screen.getByText(/Coca-Cola/i)).toBeInTheDocument();
  expect(screen.getByText(/Água/i)).toBeInTheDocument();
});
