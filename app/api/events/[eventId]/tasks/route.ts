import { NextResponse } from "next/server"; import { db } from "@/lib/db";
export async function GET(_:Request,{params}:{params:{eventId:string}}){return NextResponse.json(await db.task.findMany({where:{eventId:params.eventId}}))}
export async function POST(req:Request,{params}:{params:{eventId:string}}){const b=await req.json();const task=await db.task.create({data:{eventId:params.eventId,title:b.title,description:b.description,priority:b.priority||"MEDIUM"}});return NextResponse.json(task,{status:201})}
