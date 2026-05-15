import { db } from "@/lib/db";

export default async function SeatingPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  const tables = await db.seatingTable.findMany({
    where: { eventId },
    include: {
      seats: {
        include: {
          guest: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold">Seating</h1>
      <p className="text-gray-500">Manage tables and seat assignments.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {tables.map((table: any) => (
          <div key={table.id} className="rounded-2xl border bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{table.name}</div>
                <div className="text-sm text-gray-500">
                  Capacity: {table.capacity}
                </div>
              </div>
              <div className="text-sm text-gray-500">{table.shape}</div>
            </div>

            <div className="mt-4 grid gap-2">
              {table.seats?.length ? (
                table.seats.map((seat: any) => (
                  <div
                    key={seat.id}
                    className="rounded-lg border bg-gray-50 p-2 text-sm"
                  >
                    Seat {seat.seatNumber}:{" "}
                    {seat.guest
                      ? `${seat.guest.firstName} ${seat.guest.lastName || ""}`
                      : "Unassigned"}
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">
                  No seats assigned yet.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}