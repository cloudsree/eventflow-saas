"use server";
import { revalidatePath } from "next/cache"; import { db } from "@/lib/db";
export async function addScheduleItem(eventId:string, formData:FormData){await db.scheduleItem.create({data:{eventId,title:String(formData.get("title")),startTime:new Date(String(formData.get("startTime"))),endTime:formData.get("endTime")?new Date(String(formData.get("endTime"))):undefined,location:String(formData.get("location")||""),visibility:String(formData.get("visibility")||"INTERNAL") as any}}); revalidatePath(`/app/events/${eventId}/schedule`)}
