import { db } from "@/lib/db";

export default async function BudgetPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  const items = await db.budgetItem.findMany({
    where: { eventId },
    orderBy: { createdAt: "desc" },
  });

  const estimatedTotal = items.reduce(
    (sum: number, item: any) =>
      sum + Number(item.estimatedAmount || 0),
    0
  );

  const actualTotal = items.reduce(
    (sum: number, item: any) =>
      sum + Number(item.actualAmount || 0),
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Budget</h1>
        <p className="text-gray-500">
          Track estimated and actual expenses.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-500">
            Estimated Total
          </div>
          <div className="text-2xl font-bold">
            ${estimatedTotal.toFixed(2)}
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-500">
            Actual Total
          </div>
          <div className="text-2xl font-bold">
            ${actualTotal.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="rounded-lg border">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Estimated</th>
              <th className="p-3 text-left">Actual</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item: any) => (
              <tr key={item.id} className="border-b">
                <td className="p-3">{item.category}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">
                  ${Number(item.estimatedAmount || 0).toFixed(2)}
                </td>
                <td className="p-3">
                  ${Number(item.actualAmount || 0).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}