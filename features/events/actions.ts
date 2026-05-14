"use server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentMembership } from "@/lib/auth";
import { createEventSchema } from "@/lib/validations";

export async function createEvent(formData: FormData) {
  const membership = await getCurrentMembership();
  const parsed = createEventSchema.parse(Object.fromEntries(formData));
  const event = await db.event.create({ data: { ...parsed, organizationId: membership.organizationId } });
  redirect(`/app/events/${event.id}`);
}
