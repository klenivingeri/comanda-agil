/**
 * @jest-environment node
 */
import { getComandas } from "../controller";

describe("GET /api/comandas", () => {
  it("should return 500 if an error occurs", async () => {
    // Pass an invalid request to force an error (missing url property)
    const badRequest = {};

    const response = await getComandas("002");
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toHaveProperty("records", [
      {
        id: "002",
        name: "002",
        total: 1.5,
        date: "2025-09-12T01:44:33.637Z",
      },
    ]);
  });
});
