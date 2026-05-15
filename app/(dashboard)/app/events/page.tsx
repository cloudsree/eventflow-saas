export const dynamic = "force-dynamic";

import Link from "next/link";
import { db } from "@/lib/db";

export default async function EventsPage() {
  const events = await db.event.findMany({
    orderBy: {
      startDate: "asc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-gray-500">
            Manage weddings, conferences, conventions, and corporate events.
          </p>
        </div>

        <Link
          href="/app/events/new"
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Create Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center">
          <h2 className="text-xl font-semibold">No events yet</h2>
          <p className="mt-2 text-gray-500">
            Create your first event to get started.
          </p>

          <Link
            href="/app/events/new"
            className="mt-6 inline-flex rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Create Event
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event: any) => (
            <Link
              key={event.id}
              href={`/app/events/${event.id}`}
              className="rounded-2xl border bg-white p-5 transition hover:border-black hover:shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{event.name}</h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {event.type}
                  </p>
                </div>

                <div className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium">
                  {event.status}
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div>
                  📅{" "}
                  {new Date(event.startDate).toLocaleDateString()}
                </div>

                <div>
                  📍 {event.location || "No location"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}