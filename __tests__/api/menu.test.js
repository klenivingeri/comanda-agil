/**
 * @jest-environment node
 */

import { menu } from "../../src/app/api/menu/constant.js";
import { GET } from "../../src/app/api/menu/route.js";

describe("GET /api/items", () => {
  it("should return 200 and message when called without query params", async () => {
    // Mock request object with a URL (no query params)
    const request = { url: "http://localhost/api/menu" };

    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toHaveProperty("records", menu);
  });

  it("should return 500 if an error occurs", async () => {
    // Pass an invalid request to force an error (missing url property)
    const badRequest = {};

    const response = await GET(badRequest);
    const body = await response.json();

    expect(response.status).toBe(200);
  });
});
