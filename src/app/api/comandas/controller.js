import { comandas } from "../constants";
import { esperar } from "../utils/esperar";

export const getComandas = async (request) => {
  try {
    esperar(3000);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ records: comandas }, { status: 200 });
    }

    const comanda = comandas.find((comanda) => comanda.id == id);
    const result = comanda?.id ? [comanda] : [];

    return Response.json({ records: result }, { status: 200 });
  } catch {
    return Response.json({ message: "Rotas de items" }, { status: 500 });
  }
};
