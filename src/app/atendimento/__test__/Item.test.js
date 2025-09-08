import React from "react";
import { render, screen } from "@testing-library/react";
import { Item } from "../Item";

const mockItem = {
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
};

test("exibe nome e preço do item", () => {
  render(
    <Item
      item={mockItem}
      handleAddTotalItemsInTheCategiry={() => {}}
      handleRemoveTotalItemsInTheCategiry={() => {}}
      handleUpdateItemsSelected={() => {}}
      itemsSelected={[]}
    />
  );
  expect(screen.getByText(/Pastel de vento/i)).toBeInTheDocument();
  expect(screen.getByText(/001 - Pastel de vento/i)).toBeInTheDocument();
  expect(screen.getByText(/R\$ 10,00/i)).toBeInTheDocument();
});
