import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE = "ftm_admin";
function signature(value) {
  return crypto.createHmac("sha256", process.env.SESSION_SECRET || "missing-secret").update(value).digest("hex");
}
export function createSession() {
  const value = `${Date.now()}.${crypto.randomBytes(24).toString("hex")}`;
  return `${value}.${signature(value)}`;
}
export function validSession(token) {
  if (!token || !process.env.SESSION_SECRET) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const value = `${parts[0]}.${parts[1]}`;
  const expected = signature(value);
  const a = Buffer.from(parts[2]);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  const created = Number(parts[0]);
  return Number.isFinite(created) && Date.now() - created < 1000 * 60 * 60 * 24 * 7;
}
export async function isAdmin() {
  const store = await cookies();
  return validSession(store.get(COOKIE)?.value);
}
export const sessionCookieName = COOKIE;
