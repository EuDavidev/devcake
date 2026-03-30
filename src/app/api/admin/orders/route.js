import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { getAdminFromRequest } from "@/lib/auth/session";
import { ORDER_STATUSES } from "@/lib/domain/order-schema";

export const runtime = "nodejs";

function toOrderResponse(order) {
  return {
    id: String(order._id),
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    customerPhone: order.customerPhone || "",
    status: order.status,
    total: Number(order.total || 0),
    itemsCount: Array.isArray(order.items) ? order.items.length : 0,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
}

export async function GET(request) {
  const admin = await getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "";
  const query = searchParams.get("q") || "";

  const where = {};
  if (status && ORDER_STATUSES.includes(status)) {
    where.status = status;
  }

  if (query) {
    where.$or = [
      { customerName: { $regex: query, $options: "i" } },
      { customerEmail: { $regex: query, $options: "i" } },
    ];
  }

  const db = await getDb();
  const orders = await db
    .collection("orders")
    .find(where)
    .sort({ createdAt: -1 })
    .limit(150)
    .toArray();

  return NextResponse.json({
    orders: orders.map(toOrderResponse),
  });
}
