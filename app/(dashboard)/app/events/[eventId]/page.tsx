import { notFound } from "next/navigation";
import { db } from "@/lib/db";

export default async function EventDashboardPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  const event = await db.event.findUnique({
    where: { id: eventId },
    include: {
      guests: true,
      tasks: true,
      budgetItems: true,
      vendors: true,
      scheduleItems: true,
    },
  });

  if (!event) notFound();

  const accepted = event.guests.filter(
    (guest: any) => guest.rsvpStatus === "ACCEPTED"
  ).length;

  const completed = event.tasks.filter(
    (task: any) => task.status === "DONE"
  ).length;

  const estimated = event.budgetItems.reduce(
    (sum: number, item: any) => sum + Number(item.estimatedAmount || 0),
    0
  );

  const actual = event.budgetItems.reduce(
    (sum: number, item: any) => sum + Number(item.actualAmount || 0),
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{event.name}</h1>
        <p className="text-gray-500">{event.location || "No location set"}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border bg-white p-4">
          <div className="text-sm text-gray-500">Guests</div>
          <div className="text-2xl font-bold">
            {accepted}/{event.guests.length}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-4">
          <div className="text-sm text-gray-500">Tasks</div>
          <div className="text-2xl font-bold">
            {completed}/{event.tasks.length}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-4">
          <div className="text-sm text-gray-500">Vendors</div>
          <div className="text-2xl font-bold">{event.vendors.length}</div>
        </div>

        <div className="rounded-2xl border bg-white p-4">
          <div className="text-sm text-gray-500">Budget</div>
          <div className="text-2xl font-bold">
            ${actual.toFixed(0)} / ${estimated.toFixed(0)}
          </div>
        </div>
      </div>
    </div>
  );
}