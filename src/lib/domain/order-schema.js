import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive(),
});

export const createOrderSchema = z.object({
  customerName: z.string().min(3),
  customerEmail: z.string().email(),
  customerPhone: z.string().optional(),
  notes: z.string().optional(),
  items: z.array(orderItemSchema).min(1),
});
