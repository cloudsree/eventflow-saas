# EventFlow SaaS

A production-oriented starter for a multi-tenant event management SaaS for weddings, conferences, conventions, and corporate events.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Server Actions / API Routes
- Role-based multi-tenancy foundation

## Quick start

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Open http://localhost:3000.

## Demo

Seed creates one organization, one wedding event, guests, vendors, tasks, budget items, schedule items, and seating tables.

## Notes

Auth is intentionally minimal in this starter. Replace `lib/auth.ts` with Clerk/Auth.js before production.
