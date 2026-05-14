"use server";
import { revalidatePath } from "next/cache"; import { db } from "@/lib/db";
export async function addTask(eventId:string, formData:FormData){await db.task.create({data:{eventId,title:String(formData.get("title")),priority:String(formData.get("priority")) as any}}); revalidatePath(`/app/events/${eventId}/tasks`)}
export async function setTaskDone(taskId:string,eventId:string){await db.task.update({where:{id:taskId},data:{status:"DONE"}}); revalidatePath(`/app/events/${eventId}/tasks`)}
