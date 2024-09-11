import mongoose from 'mongoose';
import { z } from 'zod';
const objectIdSchema = z
  .string()
  .refine((value) => mongoose.Types.ObjectId.isValid(value), {
    message: 'Invalid ObjectId format',
  });
const bookingInfoValidation = z.object({
  body: z.object({
    bikeId: objectIdSchema,
    startTime: z.string({
      required_error: 'Start time is required',
    }),
    returnTime: z.string().optional(),
    totalCost: z.number().positive().optional(),
    isReturned: z.boolean().default(false),
  }),
});

const BookingInfoUpdateValidation = z.object({
  body: z.object({
    userId: objectIdSchema.optional(),
    bikeId: objectIdSchema.optional(),
    startTime: z
      .string({
        required_error: 'Start time is required',
      })
      .optional(),
    returnTime: z.string().optional(),
    totalCost: z.number().positive().optional(),
    isReturned: z.boolean().default(false).optional(),
  }),
});

export const BookingInfoValidation = {
  bookingInfoValidation,
  BookingInfoUpdateValidation,
};
