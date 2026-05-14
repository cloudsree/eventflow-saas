const plans = ["Starter", "Pro", "Business"];
export default function PricingPage() {
  return <main className="mx-auto max-w-6xl px-6 py-16"><h1 className="text-4xl font-bold">Pricing</h1><div className="mt-8 grid gap-4 md:grid-cols-3">{plans.map((p,i)=><div key={p} className="rounded-2xl border bg-white p-6 shadow-sm"><h2 className="text-xl font-semibold">{p}</h2><p className="mt-2 text-3xl font-bold">${[29,79,199][i]}<span className="text-base font-normal text-slate-500">/mo</span></p><p className="mt-4 text-slate-600">For {i===0?"solo planners":i===1?"professional teams":"venues and agencies"}.</p></div>)}</div></main>;
}
