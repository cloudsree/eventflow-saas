"use server";
import { revalidatePath } from "next/cache"; import { db } from "@/lib/db";
export async function addBudgetItem(eventId:string, formData:FormData){await db.budgetItem.create({data:{eventId,category:String(formData.get("category")),name:String(formData.get("name")),estimatedAmount:String(formData.get("estimatedAmount")||"0"),actualAmount:String(formData.get("actualAmount")||"0")}}); revalidatePath(`/app/events/${eventId}/budget`)}
