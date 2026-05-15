import { db } from "@/lib/db";

export default async function MessagesPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  const messages = await db.message.findMany({
    where: { eventId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold">Messages</h1>
      <p className="text-gray-500">Review event messages and reminders.</p>

      <div className="mt-6 grid gap-3">
        {messages.map((message: any) => (
          <div key={message.id} className="rounded-2xl border bg-white p-4">
            <div className="font-semibold">
              {message.subject || "Untitled message"}
            </div>
            <div className="text-sm text-gray-500">{message.channel}</div>
            <p className="mt-2 text-sm">{message.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}