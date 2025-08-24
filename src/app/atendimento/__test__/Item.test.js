import React from "react";
import { render, screen } from "@testing-library/react";
import { Item } from "../Item";

const mockItem = { id: "1", name: "Coca-Cola", price: 5.5 };

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
  expect(screen.getByText(/Coca-Cola/i)).toBeInTheDocument();
  expect(screen.getByText(/1 - Coca-Cola/i)).toBeInTheDocument();
  expect(screen.getByText(/R\$ 5,50/i)).toBeInTheDocument();
});
