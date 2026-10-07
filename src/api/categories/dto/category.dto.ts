import z from 'zod';
import { slugSchema } from '../../../shared/zod.js';

export const createCategorySchema = z.object({
  title: z.string().trim().nonempty(),
  slug: slugSchema,
});

export const updateCategorySchema = createCategorySchema.partial();

export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;
export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
