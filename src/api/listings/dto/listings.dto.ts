import z from 'zod';
import { ListingDeliveryType } from '../entities/listings.entity.js';

export const createListingSchema = z.object({
  name: z.string().min(10).max(100),
  description: z.string().max(255),
  price: z.number().min(0.1).max(1_000_000),
  quantity: z.number().min(1).default(1),
  deliveryType: z.enum(ListingDeliveryType),
  categoryId: z.uuid(),
  gameId: z.uuid()
});

export const updateListingSchema = createListingSchema.partial();

export type CreateListingDto = z.infer<typeof createListingSchema>;
export type UpdateListingDto = z.infer<typeof updateListingSchema>;
