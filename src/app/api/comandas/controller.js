import { comandas } from "../constants";
import { esperar } from "../utils/esperar";

export const getComandas = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    // Exemplo: pegar o valor de uma query chamada "id"
    const id = searchParams.get("id");
    const isTest = id === "test";

    esperar(3000);

    return Response.json({ records: isTest ? comandas : [] }, { status: 200 });
  } catch {
    return Response.json({ message: "Rotas de items" }, { status: 500 });
  }
};
