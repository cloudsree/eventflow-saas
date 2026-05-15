import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { submitRsvp } from "@/features/rsvp/actions";

export default async function RsvpPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const guest = await db.guest.findUnique({
    where: { rsvpToken: token },
    include: { event: true },
  });

  if (!guest) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-xl p-8">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold">RSVP</h1>

        <p className="mt-2 text-gray-600">
          {guest.event.name}
        </p>

        <p className="mt-6">
          Hello {guest.firstName} {guest.lastName || ""},
        </p>

        <form action={submitRsvp.bind(null, token)} className="mt-6 space-y-4">
          <input type="hidden" name="guestId" value={guest.id} />

          <div>
            <label className="block text-sm font-medium">
              Response
            </label>
            <select
              name="response"
              className="mt-1 w-full rounded-lg border p-2"
              defaultValue={guest.rsvpStatus}
            >
              <option value="ACCEPTED">Accept</option>
              <option value="DECLINED">Decline</option>
              <option value="MAYBE">Maybe</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Meal Preference
            </label>
            <input
              name="mealPreference"
              className="mt-1 w-full rounded-lg border p-2"
              defaultValue={guest.mealPreference || ""}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Dietary Notes
            </label>
            <textarea
              name="dietaryNotes"
              className="mt-1 w-full rounded-lg border p-2"
              defaultValue={guest.dietaryNotes || ""}
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-black px-4 py-2 font-medium text-white"
          >
            Submit RSVP
          </button>
        </form>
      </div>
    </main>
  );
}