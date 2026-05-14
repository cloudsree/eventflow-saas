"use server";
import { redirect } from "next/navigation"; import { db } from "@/lib/db";
export async function submitRsvp(token:string, formData:FormData){const guest=await db.guest.update({where:{rsvpToken:token},data:{rsvpStatus:String(formData.get("response")) as any,mealPreference:String(formData.get("mealPreference")||""),dietaryNotes:String(formData.get("dietaryNotes")||"")}}); await db.rSVP.upsert({where:{guestId:guest.id},create:{guestId:guest.id,response:guest.rsvpStatus},update:{response:guest.rsvpStatus,submittedAt:new Date()}}); redirect(`/rsvp/${token}/thanks`)}
