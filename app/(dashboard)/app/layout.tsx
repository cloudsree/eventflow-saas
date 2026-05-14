import Link from "next/link";

const nav = [
  ["Events", "/app/events"],
  ["Settings", "/app/settings"],
  ["Billing", "/app/billing"],
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen"><aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-white p-6 md:block"><Link href="/" className="text-xl font-bold text-slate-950">EventFlow</Link><nav className="mt-8 grid gap-2">{nav.map(([label,href])=><Link key={href} className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100" href={href}>{label}</Link>)}</nav></aside><main className="md:pl-64"><div className="mx-auto max-w-7xl p-6">{children}</div></main></div>;
}
