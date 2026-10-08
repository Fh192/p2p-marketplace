import type { ListingStatus } from '../listing-status.js';

export enum ListingDeliveryType {
  Automatic = 'AUTOMATIC',
  Manual = 'MANUAL'
}

export class Listing {
  sellerId: string;
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  status: ListingStatus;
  deliveryType: ListingDeliveryType;
  categoryId: string;
  gameId: string;
  createdAt: string;
  updatedAt: string;
}
