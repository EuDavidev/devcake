import { ObjectId } from "mongodb";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getAdminFromRequest: vi.fn(),
  getDb: vi.fn(),
  findOneAndUpdate: vi.fn(),
}));

vi.mock("@/lib/auth/session", () => ({
  getAdminFromRequest: mocks.getAdminFromRequest,
}));

vi.mock("@/lib/mongodb", () => ({
  getDb: mocks.getDb,
}));

import { PATCH } from "./route";

describe("PATCH /api/admin/orders/[id]/status", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mocks.getDb.mockResolvedValue({
      collection: () => ({ findOneAndUpdate: mocks.findOneAndUpdate }),
    });
  });

  it("returns 401 when admin is not authenticated", async () => {
    mocks.getAdminFromRequest.mockResolvedValueOnce(null);

    const response = await PATCH(
      {
        json: async () => ({ status: "confirmed" }),
      },
      { params: { id: "507f1f77bcf86cd799439011" } },
    );

    expect(response.status).toBe(401);
  });

  it("returns 400 when id is invalid", async () => {
    mocks.getAdminFromRequest.mockResolvedValueOnce({ id: "admin" });

    const response = await PATCH(
      {
        json: async () => ({ status: "confirmed" }),
      },
      { params: { id: "invalid-id" } },
    );

    const body = await response.json();
    expect(response.status).toBe(400);
    expect(body.message).toBe("Invalid order id");
  });

  it("updates and returns order status", async () => {
    const id = "507f1f77bcf86cd799439011";
    const now = new Date("2026-03-29T15:00:00Z");

    mocks.getAdminFromRequest.mockResolvedValueOnce({ id: "admin" });
    mocks.findOneAndUpdate.mockResolvedValueOnce({
      _id: new ObjectId(id),
      status: "delivered",
      updatedAt: now,
    });

    const response = await PATCH(
      {
        json: async () => ({ status: "delivered" }),
      },
      { params: { id } },
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(body.order).toEqual(
      expect.objectContaining({
        id,
        status: "delivered",
      }),
    );
  });
});
