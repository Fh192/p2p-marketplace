import z from 'zod';
import { slugSchema } from '../../../shared/zod.js';

export const createGameSchema = z.object({
  title: z.string().trim().nonempty(),
  slug: slugSchema,
  coverUrl: z.url().nullish(),
});

export const updateGameSchema = createGameSchema.partial();

export type UpdateGameDto = z.infer<typeof updateGameSchema>;
export type CreateGameDto = z.infer<typeof createGameSchema>;
