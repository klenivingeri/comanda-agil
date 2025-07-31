import { items } from "../constants";
import { esperar } from "../utils/esperar";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    // Exemplo: pegar o valor de uma query chamada "id"
    const id = searchParams.get("id");
    const isTest = id === "test";
    esperar();
    return Response.json({ records: isTest ? items : {} }, { status: 200 });
  } catch {
    return Response.json({ message: "Rotas de items" }, { status: 500 });
  }
}
