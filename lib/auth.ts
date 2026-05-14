import { db } from "@/lib/db";

// Replace with Clerk/Auth.js in production. This demo returns the seeded owner membership.
export async function getCurrentMembership() {
  const membership = await db.membership.findFirst({ include: { user: true, organization: true } });
  if (!membership) throw new Error("No demo membership found. Run npm run seed.");
  return membership;
}

export function requireRole(role: string, allowed: string[]) {
  if (!allowed.includes(role)) throw new Error("Forbidden");
}
