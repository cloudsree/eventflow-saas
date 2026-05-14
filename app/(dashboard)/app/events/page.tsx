import Link from "next/link";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";

export default async function EventsPage() {
  const events = await db.event.findMany({ orderBy: { startDate: "asc" }, include: { guests: true, tasks: true, vendors: true } });
  return <div><div className="flex items-center justify-between"><h1 className="text-3xl font-bold">Events</h1><Link className="rounded-xl bg-slate-950 px-4 py-2 text-white" href="/app/events/new">New event</Link></div><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{events.map(event=><Link key={event.id} href={`/app/events/${event.id}`}><Card className="p-5"><p className="text-sm text-slate-500">{event.type}</p><h2 className="mt-1 text-xl font-semibold">{event.name}</h2><p className="mt-2 text-slate-600">{event.location || "No location"}</p><div className="mt-4 grid grid-cols-3 gap-2 text-sm"><span>{event.guests.length} guests</span><span>{event.vendors.length} vendors</span><span>{event.tasks.length} tasks</span></div></Card></Link>)}</div></div>;
}
