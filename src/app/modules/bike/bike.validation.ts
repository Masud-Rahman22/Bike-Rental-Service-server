import { z } from 'zod';

const bikeInfoValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    pricePerHour: z.number().min(0, 'Price per hour must be a positive number'),
    isAvailable: z.boolean().optional().default(true),
    cc: z.number().min(50, 'Engine capacity must be at least 50cc'),
    year: z
      .number()
      .int()
      .gte(1900, 'Year must be a valid year')
      .lte(new Date().getFullYear(), 'Year cannot be in the future'),
    model: z.string().min(1, 'Model is required'),
    brand: z.string().min(1, 'Brand is required'),
  }),
});

const bikeInfoUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    pricePerHour: z
      .number()
      .min(0, 'Price per hour must be a positive number')
      .optional(),
    isAvailable: z.boolean().optional().default(true).optional(),
    cc: z.number().min(50, 'Engine capacity must be at least 50cc').optional(),
    year: z
      .number()
      .int()
      .gte(1900, 'Year must be a valid year')
      .lte(new Date().getFullYear(), 'Year cannot be in the future')
      .optional(),
    model: z.string().min(1, 'Model is required').optional(),
    brand: z.string().min(1, 'Brand is required').optional(),
  }),
});

export const BikeInfoValidation = {
  bikeInfoValidationSchema,
  bikeInfoUpdateValidationSchema,
};
