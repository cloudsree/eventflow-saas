import { z } from "zod";
export const createEventSchema = z.object({ name: z.string().min(2), type: z.enum(["WEDDING","CONFERENCE","CONVENTION","CORPORATE","SOCIAL","OTHER"]), startDate: z.coerce.date(), location: z.string().optional() });
export const guestSchema = z.object({ firstName: z.string().min(1), lastName: z.string().optional(), email: z.string().email().optional().or(z.literal("")), phone: z.string().optional(), mealPreference: z.string().optional() });
