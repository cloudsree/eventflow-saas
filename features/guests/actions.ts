"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { guestSchema } from "@/lib/validations";
export async function addGuest(eventId: string, formData: FormData) { const data = guestSchema.parse(Object.fromEntries(formData)); await db.guest.create({ data: { eventId, firstName: data.firstName, lastName: data.lastName, email: data.email || null, phone: data.phone, mealPreference: data.mealPreference } }); revalidatePath(`/app/events/${eventId}/guests`); }
export async function updateRsvpStatus(guestId: string, eventId: string, status: "PENDING"|"ACCEPTED"|"DECLINED"|"MAYBE") { await db.guest.update({ where:{id:guestId}, data:{rsvpStatus:status} }); revalidatePath(`/app/events/${eventId}/guests`); }
