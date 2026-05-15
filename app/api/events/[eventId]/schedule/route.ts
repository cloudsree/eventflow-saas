import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params;

  return NextResponse.json(
    await db.scheduleItem.findMany({
      where: { eventId },
      orderBy: { startTime: "asc" },
    })
  );
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params;
  const body = await req.json();

  const item = await db.scheduleItem.create({
    data: {
      eventId,
      title: body.title,
      description: body.description,
      startTime: new Date(body.startTime),
      endTime: body.endTime ? new Date(body.endTime) : null,
      location: body.location,
      visibility: body.visibility || "INTERNAL",
    },
  });

  return NextResponse.json(item, { status: 201 });
}