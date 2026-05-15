import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params;

  return NextResponse.json(
    await db.seatingTable.findMany({
      where: { eventId },
      include: {
        seats: {
          include: {
            guest: true,
          },
        },
      },
    })
  );
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params;
  const body = await req.json();

  const table = await db.seatingTable.create({
    data: {
      eventId,
      name: body.name,
      capacity: body.capacity || 8,
      shape: body.shape || "ROUND",
      xPosition: body.xPosition || 0,
      yPosition: body.yPosition || 0,
    },
  });

  return NextResponse.json(table, { status: 201 });
}