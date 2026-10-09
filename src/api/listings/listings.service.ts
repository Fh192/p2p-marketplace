import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

  private checkIsListingBelongUser(listingsSellerId: string, userId: string) {
    if (listingsSellerId !== userId) {
      throw new ForbiddenException('You are not the seller of this listing');
    }
  }

  findOneBy(id: string): Listing {
    const listing = this.listingsRepository.findOneBy(id);

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    return listing;
  }

  create(createListingDto: CreateListingDto, sellerId: string) {
    this.gamesService.checkGameExistence(createListingDto.gameId);
    this.categoryService.checkIsCategoryBelongGame(createListingDto.categoryId, createListingDto.gameId);

    const id = crypto.randomUUID();
    const listing: Listing = {
      ...createListingDto,
      id,
      description: createListingDto.description ?? null,
      sellerId,
      status: ListingStatus.Draft,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return this.listingsRepository.create(listing);
  }

  updateStatus(id: string, status: ListingStatus, userId?: string): Listing | null {
    const listing = this.findOneBy(id);
    const { from, to } = { from: listing.status, to: status };

    if (userId) {
      this.checkIsListingBelongUser(listing.sellerId, userId);
    }

    if (!canTransitionListingStatus(userId ? 'seller' : 'system', { from, to })) {
      throw new ConflictException(`Unable to change status from ${from} to ${to}`);
    }

    return this.listingsRepository.update(id, { status });
  }

  update(id: string, updateListingDto: UpdateListingDto, userId: string) {
    const listing = this.findOneBy(id);

    this.checkIsListingBelongUser(listing.sellerId, userId);

    if (listing.status === ListingStatus.Sold) {
      throw new ConflictException(`Unable to update listing with status ${ListingStatus.Sold}`);
    }

    return this.listingsRepository.update(id, updateListingDto);
  }
}
