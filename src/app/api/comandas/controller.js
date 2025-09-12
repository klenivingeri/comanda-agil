import { comandas } from "../constants";
import { esperar } from "../utils/esperar";

export const getComandas = async (id, xTenant) => {
  try {
    esperar(3000);
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
