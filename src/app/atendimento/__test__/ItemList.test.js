import React from "react";
import { render, screen } from "@testing-library/react";
import { ItemList } from "../ItemList";

const items = [
  {
    _id: "68b90477e7b0db3283a8d274",
    name: "Pastel de vento",
    description: "pastel sem nada dentro",
    code: "001",
    price: 10,
    category: {
      type: "frito",
      name: "Fritos",
      _id: "68b90477e7b0db3283a8d274",
    },
  },
  {
    _id: "68b90477e7b0db3283a8d271",
    name: "Esfirra de vento",
    description: "Assado de vento",
    code: "002",
    price: 10,
    category: {
      type: "assados",
      name: "Assados",
      _id: "68b90477e7b0db3283a8d271",
    },
  },
];

test("renderiza categorias e itens", () => {
  render(
    <ItemList
      items={items}
      inputText=""
      handleUpdateItemsSelected={() => {}}
      itemsSelected={[]}
    />
  );
  expect(screen.getByText(/Fritos/i)).toBeInTheDocument();
  expect(screen.getByText(/Pastel de vento/i)).toBeInTheDocument();
  expect(screen.getByText(/Assados/i)).toBeInTheDocument();
});
