import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getAdminFromRequest: vi.fn(),
  getDb: vi.fn(),
  find: vi.fn(),
  sort: vi.fn(),
  limit: vi.fn(),
  toArray: vi.fn(),
}));

vi.mock("@/lib/auth/session", () => ({
  getAdminFromRequest: mocks.getAdminFromRequest,
}));

vi.mock("@/lib/mongodb", () => ({
  getDb: mocks.getDb,
}));

import { GET } from "./route";

describe("GET /api/admin/orders", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mocks.find.mockReturnValue({ sort: mocks.sort });
    mocks.sort.mockReturnValue({ limit: mocks.limit });
    mocks.limit.mockReturnValue({ toArray: mocks.toArray });

    mocks.getDb.mockResolvedValue({
      collection: () => ({ find: mocks.find }),
    });
  });

  it("returns 401 when admin is not authenticated", async () => {
    mocks.getAdminFromRequest.mockResolvedValueOnce(null);

    const response = await GET({ url: "http://localhost/api/admin/orders" });
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.message).toBe("Unauthorized");
  });

  it("returns mapped orders when authenticated", async () => {
    mocks.getAdminFromRequest.mockResolvedValueOnce({ id: "a1" });
    mocks.toArray.mockResolvedValueOnce([
      {
        _id: "order-1",
        customerName: "Ana",
        customerEmail: "ana@devcake.com",
        status: "pending",
        total: 42,
        items: [{ id: "p1" }],
        createdAt: new Date("2026-01-01T10:00:00Z"),
        updatedAt: new Date("2026-01-01T10:00:00Z"),
      },
    ]);

    const response = await GET({
      url: "http://localhost/api/admin/orders?status=pending&q=ana",
    });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(mocks.find).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "pending",
        $or: expect.any(Array),
      }),
    );
    expect(body.orders).toHaveLength(1);
    expect(body.orders[0]).toEqual(
      expect.objectContaining({
        id: "order-1",
        customerName: "Ana",
        status: "pending",
        total: 42,
      }),
    );
  });
});
