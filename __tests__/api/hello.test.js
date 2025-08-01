/**
 * @jest-environment node
 */
import { GET } from "../../src/app/api/hello/route.js";
import { createRequest, createResponse } from "node-mocks-http";

test("API /api/hello retorna JSON com mensagem", async () => {
  // Cria requisição simulada (não precisa de dados pro GET)
  const req = createRequest({ method: "GET" });
  const res = createResponse();

  // Chama a rota diretamente
  const result = await GET();

  // Extrai conteúdo da resposta
  const body = await result.json();

  expect(result.status).toBe(200);
  expect(body).toHaveProperty("message", "Olá do Next.js com App Router!");
});
