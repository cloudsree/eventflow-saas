import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-slate-100">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-24">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-700">EventFlow SaaS</p>
          <h1 className="text-5xl font-bold tracking-tight">Plan weddings, conferences, and conventions from one modern workspace.</h1>
          <p className="mt-6 text-lg text-slate-600">Manage guests, RSVPs, vendors, budgets, schedules, seating, and messages with a multi-tenant event operations platform.</p>
          <div className="mt-8 flex gap-3">
            <Link className="rounded-xl bg-slate-950 px-5 py-3 font-medium text-white" href="/app/events">Open dashboard</Link>
            <Link className="rounded-xl border px-5 py-3 font-medium" href="/pricing">View pricing</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
