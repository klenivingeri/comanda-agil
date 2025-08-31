import { esperar } from "../utils/esperar";
import { business } from "./business";

export const getMenu = async (request) => {
  try {
    esperar(3000);
    const menu = business();

    return Response.json({ records: menu });
  } catch {
    return Response.json({ message: "Rotas de menu" }, { status: 500 });
  }
};
