import React from "react";
import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Atendimento from "../page";

describe("Atendimento", () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            records: [
              { id: 1, name: "Item 1" },
              { id: 2, name: "Item 2" },
            ],
          }),
      })
    );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("renderiza título Cardapio", async () => {
    render(<Atendimento />);

    expect(await screen.findByText(/Cardapio/i)).toBeInTheDocument();
  });
});
