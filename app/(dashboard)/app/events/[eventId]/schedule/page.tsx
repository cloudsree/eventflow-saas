import { db } from "@/lib/db";

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  const items = await db.scheduleItem.findMany({
    where: { eventId },
    orderBy: { startTime: "asc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold">Schedule</h1>
      <p className="text-gray-500">Manage event timeline and agenda.</p>

      <div className="mt-6 grid gap-3">
        {items.map((item: any) => (
          <div key={item.id} className="rounded-2xl border bg-white p-4">
            <div className="font-semibold">{item.title}</div>
            <div className="text-sm text-gray-500">
              {new Date(item.startTime).toLocaleString()}
              {item.endTime
                ? ` - ${new Date(item.endTime).toLocaleString()}`
                : ""}
            </div>
            {item.location ? (
              <div className="mt-1 text-sm">{item.location}</div>
            ) : null}
            {item.description ? (
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}