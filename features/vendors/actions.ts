"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getCurrentMembership } from "@/lib/auth";
export async function addVendor(eventId:string, formData:FormData){const m=await getCurrentMembership(); await db.vendor.create({data:{organizationId:m.organizationId,eventId,name:String(formData.get("name")),category:String(formData.get("category")) as any,contactName:String(formData.get("contactName")||""),email:String(formData.get("email")||"")}}); revalidatePath(`/app/events/${eventId}/vendors`)}
