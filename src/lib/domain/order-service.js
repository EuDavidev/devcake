import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export class DomainValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "DomainValidationError";
  }
}

export function calculateOrderTotals(items) {
  const normalizedItems = items.map((item) => ({
    ...item,
    subtotal: Number((item.unitPriceSnapshot * item.quantity).toFixed(2)),
  }));

  const total = Number(
    normalizedItems.reduce((acc, item) => acc + item.subtotal, 0).toFixed(2),
  );

  return { items: normalizedItems, total };
}

export async function hydrateOrderItemsFromCatalog(items) {
  const db = await getDb();
  const collection = db.collection("products");

  const uniqueIds = [...new Set(items.map((item) => String(item.productId)))];
  const objectIds = uniqueIds
    .filter((id) => ObjectId.isValid(id))
    .map((id) => new ObjectId(id));

  const products = await collection
    .find({
      $or: [{ id: { $in: uniqueIds } }, { _id: { $in: objectIds } }],
      isActive: { $ne: false },
    })
    .toArray();

  const byId = new Map();
  for (const product of products) {
    if (product.id) byId.set(String(product.id), product);
    if (product._id) byId.set(String(product._id), product);
  }

  const normalized = items.map((item) => {
    const product = byId.get(String(item.productId));

    if (!product) {
      throw new DomainValidationError(
        `Product ${item.productId} not found or inactive.`,
      );
    }

    return {
      productId: String(item.productId),
      nameSnapshot: product.name,
      unitPriceSnapshot: Number(product.price),
      quantity: item.quantity,
    };
  });

  return normalized;
}

export async function createOrderRecord(input) {
  const db = await getDb();
  const collection = db.collection("orders");
  const now = new Date();

  const order = {
    ...input,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };

  const result = await collection.insertOne(order);
  return { id: result.insertedId.toString(), ...order };
}
