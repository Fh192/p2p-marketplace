import { Inject, Injectable } from '@nestjs/common';
import slugify from '@sindresorhus/slugify';
import { DbService } from '../db/db.service.js';
import { DB_SERVICE_TOKEN } from '../db/db.tokens.js';
import { CreateListingDto, UpdateListingDto } from './dto/listings.dto.js';
import { Listing } from './entities/listings.entity.js';
import { ListingStatus } from './listing-status.js';

@Injectable()
export class ListingsRepository {
  constructor(@Inject(DB_SERVICE_TOKEN) private readonly dbService: DbService) { }

  create(createListingDto: CreateListingDto) {
    const id = crypto.randomUUID();
    const listing: Listing = {
      ...createListingDto,
      id,
      sellerId: 'mock',
      slug: `${id.split('-').at(0)}-${slugify(createListingDto.name)}`,
      status: ListingStatus.Draft,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.dbService.listings.push(listing);

    return listing;
  }

  findOneBy<K extends 'id' | 'slug'>(query: Pick<Listing, K>) {
    const [queryKey] = Object.keys(query) as [K];
    return this.dbService.listings.find((listing) => listing[queryKey] === query[queryKey]) ?? null;
  }

  update(id: string, updateListingDto: UpdateListingDto) {
    const listing = this.findOneBy({ id });

    if (!listing) return null;

    return Object.assign(listing, updateListingDto, { updatedAt: new Date().toISOString() });
  }
}
