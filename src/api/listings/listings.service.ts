import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesService } from '../categories/categories.service.js';
import { GamesService } from '../games/games.service.js';
import { CreateListingDto, UpdateListingDto } from './dto/listings.dto.js';
import { Listing } from './entities/listings.entity.js';
import { Actor, canTransitionListingStatus, ListingStatus } from './listing-status.js';
import { ListingsRepository } from './listings.repository.js';

@Injectable()
export class ListingsService {
  constructor(
    private readonly listingsRepository: ListingsRepository,
    private readonly gamesService: GamesService,
    private readonly categoryService: CategoriesService
  ) { }

  findOneBy<K extends 'id' | 'slug'>(query: Pick<Listing, K>): Listing {
    const listing = this.listingsRepository.findOneBy(query);

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    return listing;
  }

  create(createListingDto: CreateListingDto) {
    this.gamesService.checkGameExistence(createListingDto.gameId);
    this.categoryService.checkIsCategoryBelongGame(createListingDto.categoryId, createListingDto.gameId);

    return this.listingsRepository.create(createListingDto);
  }

  updateStatus(id: string, status: ListingStatus, actor: Actor) {
    const listing = this.findOneBy({ id });
    const { from, to } = { from: listing.status, to: status };

    if (!canTransitionListingStatus(actor, { from, to })) {
      throw new ConflictException(`Unable to change status from ${from} to ${to}`);
    }
  }

  update(id: string, updateListingDto: UpdateListingDto) {
    const listing = this.findOneBy({ id });

    if (listing.status === ListingStatus.Sold) {
      throw new ConflictException(`Unable to update listing with status ${ListingStatus.Sold}`);
    }

    this.listingsRepository.update(id, updateListingDto);

    return listing;
  }
}
