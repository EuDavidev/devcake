import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  calculateOrderTotals: vi.fn(),
  createOrderRecord: vi.fn(),
  hydrateOrderItemsFromCatalog: vi.fn(),
  DomainValidationError: class DomainValidationError extends Error {},
}));

vi.mock("@/lib/domain/order-service", () => ({
  calculateOrderTotals: mocks.calculateOrderTotals,
  createOrderRecord: mocks.createOrderRecord,
  hydrateOrderItemsFromCatalog: mocks.hydrateOrderItemsFromCatalog,
  DomainValidationError: mocks.DomainValidationError,
}));

import { POST } from "./route";

describe("POST /api/orders", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 201 with order payload when request is valid", async () => {
    mocks.hydrateOrderItemsFromCatalog.mockResolvedValueOnce([
      {
        productId: "p1",
        nameSnapshot: "Bolo",
        unitPriceSnapshot: 10,
        quantity: 2,
      },
    ]);
    mocks.calculateOrderTotals.mockReturnValueOnce({
      items: [
        {
          productId: "p1",
          nameSnapshot: "Bolo",
          unitPriceSnapshot: 10,
          quantity: 2,
          subtotal: 20,
        },
      ],
      total: 20,
    });
    mocks.createOrderRecord.mockResolvedValueOnce({
      id: "order-1",
      status: "pending",
      total: 20,
    });

    const request = new Request("http://localhost/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: "Ana Dev",
        customerEmail: "ana@devcake.com",
        items: [{ productId: "p1", quantity: 2 }],
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body).toEqual({
      orderId: "order-1",
      status: "pending",
      total: 20,
    });
  });

  it("returns 400 when payload is invalid", async () => {
    const request = new Request("http://localhost/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerName: "A" }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.message).toBe("Invalid order payload");
  });

  it("returns 500 when infrastructure fails", async () => {
    mocks.hydrateOrderItemsFromCatalog.mockResolvedValueOnce([
      {
        productId: "p1",
        nameSnapshot: "Bolo",
        unitPriceSnapshot: 10,
        quantity: 1,
      },
    ]);
    mocks.calculateOrderTotals.mockReturnValueOnce({ items: [], total: 10 });
    mocks.createOrderRecord.mockRejectedValueOnce(new Error("db down"));

    const request = new Request("http://localhost/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: "Ana Dev",
        customerEmail: "ana@devcake.com",
        items: [{ productId: "p1", quantity: 1 }],
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.message).toBe("Unable to create order");
  });
});
