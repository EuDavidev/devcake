import { beforeEach, describe, expect, it, vi } from "vitest";

const findMock = vi.fn();

vi.mock("@/lib/mongodb", () => ({
  getDb: vi.fn(async () => ({
    collection: vi.fn(() => ({
      find: findMock,
    })),
  })),
}));

import {
  calculateOrderTotals,
  hydrateOrderItemsFromCatalog,
} from "./order-service";

describe("calculateOrderTotals", () => {
  it("calculates total from items", () => {
    const result = calculateOrderTotals([
      { unitPriceSnapshot: 10, quantity: 2 },
      { unitPriceSnapshot: 5.5, quantity: 1 },
    ]);

    expect(result.total).toBe(25.5);
  });
});

describe("hydrateOrderItemsFromCatalog", () => {
  beforeEach(() => {
    findMock.mockReset();
  });

  it("consulta produtos por id string e numerico para compatibilidade", async () => {
    const toArray = vi.fn().mockResolvedValue([
      {
        id: 1,
        name: "Bauru",
        price: 24.9,
        isActive: true,
      },
    ]);

    findMock.mockReturnValue({ toArray });

    await hydrateOrderItemsFromCatalog([{ productId: "1", quantity: 2 }]);

    const query = findMock.mock.calls[0][0];
    expect(query.$or[0].id.$in).toContain("1");
    expect(query.$or[0].id.$in).toContain(1);
  });
});
