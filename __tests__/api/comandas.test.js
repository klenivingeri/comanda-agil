/**
 * @jest-environment node
 */
import { GET } from "../../src/app/api/comandas/route.js";

describe("GET /api/items", () => {
  // it("should return 200 and message when called without query params", async () => {
  //   // Mock request object with a URL (no query params)
  //   const request = { url: "http://localhost/api/comandas?id=123" };

  //   const response = await GET(request);
  //   const body = await response.json();

  //   expect(response.status).toBe(200);
  //   expect(body).toHaveProperty("records", []);
  // });

  // it("should return 200 and message when called with id query param", async () => {
  //   // Mock request object with a URL containing id param
  //   const request = { url: "http://localhost/api/comandas?id=123" };

  //   const response = await GET(request);
  //   const body = await response.json();

  //   expect(response.status).toBe(200);
  //   expect(body).toHaveProperty("records", []);
  // });

  it("should return 500 if an error occurs", async () => {
    // Pass an invalid request to force an error (missing url property)
    const badRequest = {};

    const response = await GET(badRequest);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toHaveProperty("message", "Rotas de items");
  });
});
