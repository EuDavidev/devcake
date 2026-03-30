import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { getDb } from "@/lib/mongodb";
import { getAdminFromRequest } from "@/lib/auth/session";
import { orderStatusSchema } from "@/lib/domain/order-schema";

export const runtime = "nodejs";

const updateStatusSchema = z.object({
  status: orderStatusSchema,
});

export async function PATCH(request, context) {
  const admin = await getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = context.params?.id;
  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid order id" }, { status: 400 });
  }

  try {
    const payload = await request.json();
    const parsed = updateStatusSchema.parse(payload);

    const db = await getDb();
    const result = await db.collection("orders").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: parsed.status,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" },
    );

    if (!result) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      order: {
        id: String(result._id),
        status: result.status,
        updatedAt: result.updatedAt,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Unable to update order status" },
      { status: 500 },
    );
  }
}
