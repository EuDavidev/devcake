import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { z } from "zod";
import { getDb } from "@/lib/mongodb";
import { verifyPassword } from "@/lib/auth/password";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 8;
const attempts = new Map();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry) return false;

  if (now - entry.startedAt > WINDOW_MS) {
    attempts.delete(ip);
    return false;
  }

  return entry.count >= MAX_ATTEMPTS;
}

function registerAttempt(ip, success) {
  if (success) {
    attempts.delete(ip);
    return;
  }

  const now = Date.now();
  const current = attempts.get(ip);
  if (!current || now - current.startedAt > WINDOW_MS) {
    attempts.set(ip, { count: 1, startedAt: now });
    return;
  }

  attempts.set(ip, { count: current.count + 1, startedAt: current.startedAt });
}

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { message: "Too many attempts. Try again later." },
        { status: 429 },
      );
    }

    const payload = await request.json();
    const parsed = loginSchema.parse(payload);
    const email = parsed.email.trim().toLowerCase();
    const password = parsed.password;

    const db = await getDb();
    const admin = await db.collection("admins").findOne({ email });

    if (!admin) {
      registerAttempt(ip, false);
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 401 },
      );
    }

    const isValid = await verifyPassword(password, admin.passwordHash);
    if (!isValid) {
      registerAttempt(ip, false);
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 401 },
      );
    }

    registerAttempt(ip, true);

    const token = randomBytes(32).toString("hex");
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    await db.collection("admin_sessions").insertOne({
      token,
      adminId: admin._id,
      createdAt: now,
      expiresAt,
    });

    const response = NextResponse.json({ ok: true });
    response.cookies.set("admin_session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 },
      );
    }

    return NextResponse.json({ message: "Unable to login." }, { status: 500 });
  }
}
