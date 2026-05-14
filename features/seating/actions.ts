"use server";
import { revalidatePath } from "next/cache"; import { db } from "@/lib/db";
export async function addTable(eventId:string, formData:FormData){const capacity=Number(formData.get("capacity")||8); const table=await db.seatingTable.create({data:{eventId,name:String(formData.get("name")),capacity}}); await db.seat.createMany({data:Array.from({length:capacity},(_,i)=>({tableId:table.id,seatNumber:i+1}))}); revalidatePath(`/app/events/${eventId}/seating`)}
export async function assignSeat(eventId:string, seatId:string, formData:FormData){const guestId=String(formData.get("guestId")||""); await db.seat.update({where:{id:seatId},data:{guestId:guestId||null}}); revalidatePath(`/app/events/${eventId}/seating`)}
