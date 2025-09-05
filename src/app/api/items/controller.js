import { items } from "../constants";
import { esperar } from "../utils/esperar";
import { connectToDatabase } from "../lib/dbConnect";
import { product } from "./productModel";

export const getProducts = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    // Exemplo: pegar o valor de uma query chamada "id"
    const id = searchParams.get("id");

    const item = items.find((item) => item.id == id);
    //    await connectToDatabase();
    //    const allProducts = await product.find({});
    //    console.log(allProducts);
    esperar(6000);

    return Response.json(
      { records: item?.id ? [item] : items },
      { status: 200 }
    );
  } catch {
    return Response.json({ message: "Rotas de items" }, { status: 500 });
  }
};

export const postProducts = async (request) => {
  try {
    await esperar(6000);
    const body = await request.json();
    console.log(body);

    // await connectToDatabase();
    // await product.create(body);
    return Response.json({ message: "sucesso" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json(
      { message: "Ocorreu um erro ao Fazer o cadastro do item" },
      { status: 500 }
    );
  }
};
