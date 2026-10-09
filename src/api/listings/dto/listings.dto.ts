import z from 'zod';
import { floatSchema } from '../../../shared/validation/float.js';
import { ListingDeliveryType } from '../entities/listings.entity.js';
import { ListingStatus } from '../listing-status.js';

export const createListingSchema = z.object({
  name: z.string().trim().min(10).max(100),
  description: z.string().trim().max(255).optional(),
  price: floatSchema.min(0.1).max(1_000_000),
  quantity: z.int().min(1).default(1),
  deliveryType: z.enum(ListingDeliveryType),
  categoryId: z.uuid(),
  gameId: z.uuid()
});

export const updateListingSchema = createListingSchema.partial().omit({
  categoryId: true,
  gameId: true
}).extend({
  status: z.enum(ListingStatus).optional()
});

export type CreateListingDto = z.infer<typeof createListingSchema>;
export type UpdateListingDto = z.infer<typeof updateListingSchema>;
