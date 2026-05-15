import { db } from "@/lib/db";

export default async function GuestsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  const guests = await db.guest.findMany({
    where: { eventId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Guests</h1>
        <p className="text-gray-500">Manage guest list and RSVP status.</p>
      </div>

      <div className="rounded-lg border">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">RSVP</th>
              <th className="p-3 text-left">Meal</th>
            </tr>
          </thead>

          <tbody>
            {guests.map((guest: any) => (
              <tr key={guest.id} className="border-b">
                <td className="p-3">
                  {guest.firstName} {guest.lastName}
                </td>
                <td className="p-3">{guest.email || "-"}</td>
                <td className="p-3">{guest.phone || "-"}</td>
                <td className="p-3">{guest.rsvpStatus}</td>
                <td className="p-3">{guest.mealPreference || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}