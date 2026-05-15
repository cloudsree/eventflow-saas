import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params;

  return NextResponse.json(
    await db.vendor.findMany({
      where: { eventId },
      orderBy: { createdAt: "desc" },
    })
  );
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params;
  const body = await req.json();

  const event = await db.event.findUnique({
    where: { id: eventId },
    select: { organizationId: true },
  });

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  const vendor = await db.vendor.create({
    data: {
      organizationId: event.organizationId,
      eventId,
      name: body.name,
      category: body.category || "OTHER",
      contactName: body.contactName,
      email: body.email,
      phone: body.phone,
      website: body.website,
      notes: body.notes,
    },
  });

  return NextResponse.json(vendor, { status: 201 });
}