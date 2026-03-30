import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export const SESSION_COOKIE_NAME = "admin_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 8;

export async function createAdminSession(adminId) {
  const db = await getDb();
  const token = randomBytes(32).toString("hex");
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_TTL_SECONDS * 1000);

  await db.collection("admin_sessions").insertOne({
    token,
    adminId: typeof adminId === "string" ? new ObjectId(adminId) : adminId,
    createdAt: now,
    expiresAt,
  });

  return token;
}

export async function getAdminFromSessionToken(token) {
  if (!token) return null;

  const db = await getDb();
  const now = new Date();

  const session = await db.collection("admin_sessions").findOne({
    token,
    expiresAt: { $gt: now },
  });

  if (!session) return null;

  const admin = await db.collection("admins").findOne({ _id: session.adminId });
  if (!admin) return null;

  return { admin, session };
}

export async function deleteAdminSession(token) {
  if (!token) return;
  const db = await getDb();
  await db.collection("admin_sessions").deleteOne({ token });
}

export async function getAdminFromRequest(request) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const payload = await getAdminFromSessionToken(token);
  return payload?.admin || null;
}

export async function getAdminFromServerCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const payload = await getAdminFromSessionToken(token);
  return payload?.admin || null;
}
