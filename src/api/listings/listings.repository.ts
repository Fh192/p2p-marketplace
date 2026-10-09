import { Inject, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service.js';
import { DB_SERVICE_TOKEN } from '../db/db.tokens.js';
import { UpdateListingDto } from './dto/listings.dto.js';
import { Listing } from './entities/listings.entity.js';

@Injectable()
export class ListingsRepository {
  constructor(@Inject(DB_SERVICE_TOKEN) private readonly dbService: DbService) { }

  create(listing: Listing) {
    this.dbService.listings.push(listing);
    return listing;
  }

  findOneBy(id: string) {
    return this.dbService.listings.find((listing) => listing.id === id) ?? null;
  }

  update(id: string, updateListingDto: UpdateListingDto) {
    const listing = this.findOneBy(id);

    if (!listing) return null;

    return Object.assign(listing, updateListingDto, { updatedAt: new Date().toISOString() });
  }
}
