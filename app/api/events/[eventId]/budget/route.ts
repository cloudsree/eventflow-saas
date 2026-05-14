import { NextResponse } from "next/server"; import { db } from "@/lib/db";
export async function GET(_:Request,{params}:{params:{eventId:string}}){return NextResponse.json(await db.budgetItem.findMany({where:{eventId:params.eventId}}))}
export async function POST(req:Request,{params}:{params:{eventId:string}}){const b=await req.json();const item=await db.budgetItem.create({data:{eventId:params.eventId,category:b.category,name:b.name,estimatedAmount:b.estimatedAmount||0,actualAmount:b.actualAmount||0}});return NextResponse.json(item,{status:201})}
