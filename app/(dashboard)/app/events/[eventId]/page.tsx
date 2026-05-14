import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { money } from "@/lib/utils";

const tabs = ["guests","vendors","tasks","budget","schedule","seating","messages"];

export default async function EventDashboard({ params }: { params: { eventId: string } }) {
  const event = await db.event.findUnique({ where: { id: params.eventId }, include: { guests: true, vendors: true, tasks: true, budgetItems: true, scheduleItems: true } });
  if (!event) notFound();
  const accepted = event.guests.filter(g=>g.rsvpStatus==="ACCEPTED").length;
  const completed = event.tasks.filter(t=>t.status==="DONE").length;
  const estimated = event.budgetItems.reduce((sum,i)=>sum+Number(i.estimatedAmount),0);
  const actual = event.budgetItems.reduce((sum,i)=>sum+Number(i.actualAmount ?? 0),0);
  return <div><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm text-slate-500">{event.type}</p><h1 className="text-3xl font-bold">{event.name}</h1><p className="text-slate-600">{event.location}</p></div><div className="flex flex-wrap gap-2">{tabs.map(t=><Link key={t} className="rounded-lg border bg-white px-3 py-2 text-sm capitalize" href={`/app/events/${event.id}/${t}`}>{t}</Link>)}</div></div><div className="mt-6 grid gap-4 md:grid-cols-4"><Card className="p-5"><p className="text-sm text-slate-500">Guests</p><p className="text-3xl font-bold">{event.guests.length}</p><p className="text-sm text-slate-500">{accepted} accepted</p></Card><Card className="p-5"><p className="text-sm text-slate-500">Tasks</p><p className="text-3xl font-bold">{completed}/{event.tasks.length}</p><p className="text-sm text-slate-500">completed</p></Card><Card className="p-5"><p className="text-sm text-slate-500">Vendors</p><p className="text-3xl font-bold">{event.vendors.length}</p><p className="text-sm text-slate-500">active</p></Card><Card className="p-5"><p className="text-sm text-slate-500">Budget</p><p className="text-3xl font-bold">{money(actual)}</p><p className="text-sm text-slate-500">of {money(estimated)}</p></Card></div><Card className="mt-6 p-5"><h2 className="text-xl font-semibold">Upcoming schedule</h2><div className="mt-4 grid gap-3">{event.scheduleItems.slice(0,5).map(i=><div key={i.id} className="flex justify-between rounded-xl bg-slate-50 p-3"><span>{i.title}</span><span className="text-slate-500">{i.startTime.toLocaleString()}</span></div>)}</div></Card></div>;
}
