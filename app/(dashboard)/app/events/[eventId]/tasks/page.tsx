import { db } from "@/lib/db";

export default async function TasksPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  const tasks = await db.task.findMany({
    where: { eventId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold">Tasks</h1>
      <p className="text-gray-500">Track planning tasks and progress.</p>

      <div className="mt-6 grid gap-3">
        {tasks.map((task: any) => (
          <div
            key={task.id}
            className="flex items-center justify-between rounded-2xl border bg-white p-4"
          >
            <div>
              <div className="font-semibold">{task.title}</div>
              <div className="text-sm text-gray-500">
                {task.description || "No description"}
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm font-medium">{task.status}</div>
              <div className="text-xs text-gray-500">{task.priority}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}