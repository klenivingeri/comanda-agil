import { jest } from "@jest/globals";
import { postProducts } from "../controller.js";

describe("postProducts", () => {
  let mockConnectToDatabase;
  let mockProduct;
  let mockResponseJson;
  let mockCategories;

  beforeEach(() => {
    mockConnectToDatabase = jest.fn();
    mockProduct = { create: jest.fn() };
    mockCategories = jest.fn();
    // Mock do Response.json
    mockResponseJson = jest.fn().mockImplementation((data, init) => ({
      ...data,
      status: init?.status || 200,
    }));

    global.Response = { json: mockResponseJson };
  });

  it("deve retornar sucesso quando o produto for criado", async () => {
    const body = { name: "Produto Teste" };

    const result = await postProducts({
      connectToDatabase: mockConnectToDatabase,
      product: mockProduct,
      categories: mockCategories,
      body,
      xTenant: {},
    });

    expect(mockConnectToDatabase).toHaveBeenCalled();
    expect(mockProduct.create).toHaveBeenCalledWith(body);
    expect(mockResponseJson).toHaveBeenCalledWith(
      { message: "Sucesso" },
      { status: 200 }
    );
    expect(result).toEqual({ message: "Sucesso", status: 200 });
  });

  it("deve retornar erro caso aconteça uma exceção", async () => {
    const body = { name: "Produto com erro" };
    mockProduct.create.mockRejectedValue(new Error("Falha no banco"));

    const result = await postProducts({
      connectToDatabase: mockConnectToDatabase,
      product: mockProduct,
      categories: mockCategories,
      body,
      xTenant: {},
    });

    expect(mockResponseJson).toHaveBeenCalledWith(
      { message: "Ocorreu um erro ao Fazer o cadastro do item" },
      { status: 500 }
    );
    expect(result).toEqual({
      message: "Ocorreu um erro ao Fazer o cadastro do item",
      status: 500,
    });
  });
});
