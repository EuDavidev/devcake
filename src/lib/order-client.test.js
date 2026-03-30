import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { submitOrder } from "@/lib/order-client";

describe("submitOrder", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("envia pedido para /api/orders e retorna payload", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ orderId: "123", status: "pending", total: 54.9 }),
    });

    vi.stubGlobal("fetch", fetchMock);

    const payload = {
      customerName: "Davi Souza",
      customerEmail: "davi@email.com",
      customerPhone: "11999999999",
      notes: "Sem lactose",
      items: [{ productId: "1", quantity: 2 }],
    };

    const result = await submitOrder(payload);

    expect(fetchMock).toHaveBeenCalledWith("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    expect(result).toEqual({ orderId: "123", status: "pending", total: 54.9 });
  });

  it("dispara erro amigavel quando API falha", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ message: "Invalid order payload" }),
      }),
    );

    await expect(
      submitOrder({
        customerName: "Davi Souza",
        customerEmail: "davi@email.com",
        items: [{ productId: "1", quantity: 1 }],
      }),
    ).rejects.toThrow("Invalid order payload");
  });
});
