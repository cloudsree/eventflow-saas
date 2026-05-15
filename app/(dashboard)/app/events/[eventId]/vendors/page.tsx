import { db } from "@/lib/db";

export default async function VendorsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  const vendors = await db.vendor.findMany({
    where: { eventId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold">Vendors</h1>
      <p className="text-gray-500">Manage event vendors and contacts.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {vendors.map((vendor: any) => (
          <div key={vendor.id} className="rounded-2xl border bg-white p-4">
            <div className="font-semibold">{vendor.name}</div>
            <div className="text-sm text-gray-500">{vendor.category}</div>

            <div className="mt-3 space-y-1 text-sm">
              <div>{vendor.contactName || "No contact name"}</div>
              <div>{vendor.email || "No email"}</div>
              <div>{vendor.phone || "No phone"}</div>
            </div>

            {vendor.notes ? (
              <p className="mt-3 text-sm text-gray-600">{vendor.notes}</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}