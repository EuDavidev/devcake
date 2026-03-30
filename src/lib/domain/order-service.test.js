import { describe, expect, it } from "vitest";
import { calculateOrderTotals } from "./order-service";

describe("calculateOrderTotals", () => {
  it("calculates total from items", () => {
    const result = calculateOrderTotals([
      { unitPriceSnapshot: 10, quantity: 2 },
      { unitPriceSnapshot: 5.5, quantity: 1 },
    ]);

    expect(result.total).toBe(25.5);
  });
});
