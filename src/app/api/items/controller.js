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
