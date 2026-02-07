import { z } from 'zod';
import { insertBookingSchema, bookings } from './schema';

export const api = {
  bookings: {
    create: {
      method: 'POST' as const,
      path: '/api/bookings' as const,
      input: insertBookingSchema,
      responses: {
        201: z.custom<typeof bookings.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
  },
};
