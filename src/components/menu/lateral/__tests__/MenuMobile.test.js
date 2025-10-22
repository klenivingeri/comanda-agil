import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { MenuMobile } from "../MenuMobile";

test("exibe a saudação com o nome e expande o menu", () => {
  render(
    <MenuMobile
      handleOpenModal={() => {}}
      openModal={true}
      menuItems={[
        {
          title: "Comandas",
          path: "/comandas",
          icon: "IconCommand",
        },
        {
          title: "Categoria",
          path: "/categoria",
          icon: "IconShoppingCart",
          sublink: [
            {
              title: "Cadastrar",
              path: "/cadastrar/create",
              icon: "IconCreate",
            },
            {
              title: "Consultar",
              path: "/consultar",
              icon: "IconSearch",
            },
            {
              title: "Relatório",
              path: "/relatorio",
              icon: "IconChart",
            },
          ],
        },
      ]}
      user={{ all: [{ name: "Joãozin" }], get: () => {} }}
    ></MenuMobile>
  );
  expect(screen.getByText(/Joãozin/i)).toBeInTheDocument();
  expect(screen.getByText(/Comandas/i)).toBeInTheDocument();

  // Simula o clique no item "Categoria" para abrir o dropdown
  fireEvent.click(screen.getByText(/Categoria/i));

  // Agora verifica se o item do submenu está visível
  expect(screen.getByText(/Cadastrar/i)).toBeInTheDocument();
});
