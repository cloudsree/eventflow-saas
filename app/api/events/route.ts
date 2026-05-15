import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentMembership } from "@/lib/auth";
import { createEventSchema } from "@/lib/validations";

export async function GET() {
  return NextResponse.json(
    await db.event.findMany({
      orderBy: { startDate: "asc" },
    })
  );
}

export async function POST(req: Request) {
  const membership = await getCurrentMembership();
  const body = createEventSchema.parse(await req.json());

  const event = await db.event.create({
    data: {
      ...body,
      organizationId: membership.organizationId,
    },
  });

  return NextResponse.json(event, { status: 201 });
}