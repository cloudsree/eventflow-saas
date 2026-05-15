import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.auditLog.deleteMany();
  await prisma.message.deleteMany();
  await prisma.seat.deleteMany();
  await prisma.seatingTable.deleteMany();
  await prisma.scheduleItem.deleteMany();
  await prisma.budgetItem.deleteMany();
  await prisma.task.deleteMany();
  await prisma.vendor.deleteMany();
  await prisma.rSVP.deleteMany();
  await prisma.guest.deleteMany();
  await prisma.event.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({ data: { email: "owner@example.com", name: "Demo Owner" } });
  const org = await prisma.organization.create({ data: { name: "Evergreen Events", slug: "evergreen-events" } });
  await prisma.membership.create({ data: { userId: user.id, organizationId: org.id, role: "OWNER" } });
  await prisma.subscription.create({ data: { organizationId: org.id, plan: "PRO", status: "ACTIVE" } });
  const event = await prisma.event.create({ data: { organizationId: org.id, name: "Smith Wedding", type: "WEDDING", status: "ACTIVE", startDate: new Date("2026-09-12T21:00:00Z"), location: "Charleston, SC", publicSlug: "smith-wedding" } });

  await prisma.guest.createMany({ data: [
    { eventId: event.id, firstName: "Ava", lastName: "Johnson", email: "ava@example.com", rsvpStatus: "ACCEPTED", mealPreference: "Vegetarian" },
    { eventId: event.id, firstName: "Liam", lastName: "Patel", email: "liam@example.com", rsvpStatus: "PENDING" },
    { eventId: event.id, firstName: "Mia", lastName: "Garcia", email: "mia@example.com", rsvpStatus: "DECLINED" }
  ] });
  await prisma.vendor.createMany({ data: [
    { organizationId: org.id, eventId: event.id, name: "Harbor View Venue", category: "VENUE", contactName: "Kim Lee", email: "venue@example.com", paymentStatus: "DEPOSIT_PAID" },
    { organizationId: org.id, eventId: event.id, name: "Bloom Floral", category: "FLORIST", contactName: "Rose Chen", email: "floral@example.com" }
  ] });
  await prisma.task.createMany({ data: [
    { eventId: event.id, title: "Finalize guest list", status: "IN_PROGRESS", priority: "HIGH" },
    { eventId: event.id, title: "Confirm catering headcount", status: "TODO", priority: "URGENT" },
    { eventId: event.id, title: "Send vendor timeline", status: "DONE", priority: "MEDIUM" }
  ] });
  await prisma.budgetItem.createMany({ data: [
    { eventId: event.id, category: "Venue", name: "Venue rental", estimatedAmount: "12000", actualAmount: "12500", paidAmount: "6000" },
    { eventId: event.id, category: "Catering", name: "Dinner service", estimatedAmount: "18000", actualAmount: "0", paidAmount: "0" }
  ] });
  await prisma.scheduleItem.createMany({ data: [
    { eventId: event.id, title: "Ceremony", startTime: new Date("2026-09-12T21:00:00Z"), location: "Garden" },
    { eventId: event.id, title: "Cocktail Hour", startTime: new Date("2026-09-12T22:00:00Z"), location: "Terrace" },
    { eventId: event.id, title: "Reception", startTime: new Date("2026-09-12T23:30:00Z"), location: "Ballroom" }
  ] });
  const table = await prisma.seatingTable.create({ data: { eventId: event.id, name: "Table 1", capacity: 8 } });
  await prisma.seat.createMany({ data: Array.from({ length: 8 }, (_, i) => ({ tableId: table.id, seatNumber: i + 1 })) });
}

main().finally(async () => prisma.$disconnect());
