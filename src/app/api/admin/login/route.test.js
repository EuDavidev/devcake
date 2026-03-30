import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getDb: vi.fn(),
  verifyPassword: vi.fn(),
  createAdminSession: vi.fn(),
  findOne: vi.fn(),
}));

vi.mock("@/lib/mongodb", () => ({
  getDb: mocks.getDb,
}));

vi.mock("@/lib/auth/password", () => ({
  verifyPassword: mocks.verifyPassword,
}));

vi.mock("@/lib/auth/session", () => ({
  createAdminSession: mocks.createAdminSession,
  SESSION_COOKIE_NAME: "admin_session",
  SESSION_TTL_SECONDS: 28800,
}));

import { POST } from "./route";

describe("POST /api/admin/login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getDb.mockResolvedValue({
      collection: () => ({ findOne: mocks.findOne }),
    });
  });

  function createRequest(payload, ip = "127.0.0.1") {
    return {
      headers: {
        get: (key) => {
          if (key === "x-real-ip") return ip;
          return null;
        },
      },
      json: async () => payload,
    };
  }

  it("returns 400 for invalid payload", async () => {
    const response = await POST(
      createRequest({ email: "invalid" }, "127.0.0.2"),
    );
    expect(response.status).toBe(400);
  });

  it("returns 401 for invalid credentials", async () => {
    mocks.findOne.mockResolvedValueOnce(null);

    const response = await POST(
      createRequest(
        { email: "admin@devcake.com", password: "123456" },
        "127.0.0.3",
      ),
    );
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.message).toBe("Invalid credentials.");
  });

  it("returns 200 and sets session cookie for valid credentials", async () => {
    mocks.findOne.mockResolvedValueOnce({
      _id: "admin-id",
      passwordHash: "hash",
    });
    mocks.verifyPassword.mockResolvedValueOnce(true);
    mocks.createAdminSession.mockResolvedValueOnce("session-token");

    const response = await POST(
      createRequest(
        { email: "admin@devcake.com", password: "123456" },
        "127.0.0.4",
      ),
    );

    expect(response.status).toBe(200);
    expect((await response.json()).ok).toBe(true);
    expect(response.headers.get("set-cookie")).toContain(
      "admin_session=session-token",
    );
  });
});
