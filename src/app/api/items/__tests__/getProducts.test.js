import { jest } from "@jest/globals";
import { getProducts } from "../controller.js";

const mockProducts = [
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
];

describe("getProducts", () => {
  let mockConnectToDatabase;
  let mockProduct;
  let mockResponseJson;

  beforeEach(() => {
    mockConnectToDatabase = jest.fn();
    mockProduct = {
      find: jest.fn(),
      findOne: jest.fn(),
    };

    mockResponseJson = jest.fn().mockImplementation((data, init) => ({
      ...data,
      status: init?.status || 200,
    }));

    global.Response = { json: mockResponseJson };
  });

  it("deve retornar todos os produtos quando não houver erro", async () => {
    mockProduct.find.mockResolvedValue(mockProducts);

    const result = await getProducts(mockConnectToDatabase, mockProduct, null);

    expect(mockConnectToDatabase).toHaveBeenCalled();
    expect(mockProduct.find).toHaveBeenCalledWith({});
    expect(mockResponseJson).toHaveBeenCalledWith(
      { records: mockProducts },
      { status: 200 }
    );
    expect(result).toEqual({ records: mockProducts, status: 200 });
  });

  it("deve retornar erro 404 quando o retorno for vazio", async () => {
    mockProduct.findOne.mockResolvedValue({});

    const result = await getProducts(mockConnectToDatabase, mockProduct);

    expect(mockResponseJson).toHaveBeenCalledWith(
      { message: "Nenhum item encontrado" },
      { status: 404 }
    );
    expect(result).toEqual({
      message: "Nenhum item encontrado",
      status: 404,
    });
  });

  it("deve retornar erro 500 quando houver exceção", async () => {
    mockProduct.find.mockRejectedValue(new Error("DB Error"));

    const result = await getProducts(mockConnectToDatabase, mockProduct);

    expect(mockResponseJson).toHaveBeenCalledWith(
      { message: "Erro ao processar os itens" },
      { status: 500 }
    );
    expect(result).toEqual({
      message: "Erro ao processar os itens",
      status: 500,
    });
  });
});
