import mongoose from 'mongoose';
import { z } from 'zod';
const objectIdSchema = z.string().refine(value => mongoose.Types.ObjectId.isValid(value), {
  message: "Invalid ObjectId format",
});
const bookingInfoValidationSchema = z.object({
  body: z.object({
      bikeId: objectIdSchema,
      startTime: z.string({
        required_error: "Start time is required",
      }),
      returnTime: z.string().optional(),
      totalCost: z.number().positive().optional(),
      isReturned: z.boolean().default(false),
  }),
});

const rentalRequestSchema = z.object({
    bikeId: z.string().nonempty("Bike ID is required"),
    startTime: z.date().refine((date) => date instanceof Date, {
      message: "Invalid start time format",
    })
  });

export const BookingInfoValidation = {
    bookingInfoValidationSchema,
    rentalRequestSchema
};
