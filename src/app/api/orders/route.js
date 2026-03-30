import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { createOrderSchema } from "@/lib/domain/order-schema";
import {
  calculateOrderTotals,
  createOrderRecord,
  DomainValidationError,
  hydrateOrderItemsFromCatalog,
} from "@/lib/domain/order-service";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const payload = await request.json();
    const parsed = createOrderSchema.parse(payload);
    const catalogItems = await hydrateOrderItemsFromCatalog(parsed.items);
    const { items, total } = calculateOrderTotals(catalogItems);

    const created = await createOrderRecord({
      ...parsed,
      items,
      total,
    });

    return NextResponse.json(
      {
        orderId: created.id,
        status: created.status,
        total: created.total,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ZodError || error instanceof DomainValidationError) {
      return NextResponse.json(
        { message: "Invalid order payload" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Unable to create order" },
      { status: 500 },
    );
  }
}
