import Link from "next/link";
import { db } from "@/lib/db";

export default async function EventsPage() {
  const events = await db.event.findMany({
    orderBy: { startDate: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-gray-500">Manage all your events.</p>
        </div>

        <Link
          href="/app/events/new"
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
        >
          New Event
        </Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event: any) => (
          <Link
            key={event.id}
            href={`/app/events/${event.id}`}
            className="rounded-2xl border bg-white p-5 hover:bg-gray-50"
          >
            <div className="text-lg font-semibold">{event.name}</div>
            <div className="mt-1 text-sm text-gray-500">{event.type}</div>
            <div className="mt-4 text-sm text-gray-600">
              {event.location || "No location set"}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {new Date(event.startDate).toLocaleDateString()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}