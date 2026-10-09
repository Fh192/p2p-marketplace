import type { CreateListingDto, UpdateListingDto } from './dto/listings.dto.js';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import z from 'zod';
import { CurrentUser } from '../../shared/decorators/current-user.decorator.js';
import { createListingSchema, updateListingSchema } from './dto/listings.dto.js';
import { ListingStatus } from './listing-status.js';
import { ListingsService } from './listings.service.js';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) { }

  @Post()
  create(
    @Body({ schema: createListingSchema }) createListingDto: CreateListingDto,
    @CurrentUser('id', { schema: z.uuid() }) userId: string,
  ) {
    return this.listingsService.create(createListingDto, userId);
  }

  @Get(':id')
  findOne(@Param('id', { schema: z.uuid() }) id: string) {
    return this.listingsService.findOneBy(id);
  }

  @Patch(':id')
  update(
    @Param('id', { schema: z.uuid() }) id: string,
    @Body({ schema: updateListingSchema.omit({ status: true }) }) updateListingDto: Omit<UpdateListingDto, 'status'>,
    @CurrentUser('id', { schema: z.uuid() }) userId: string
  ) {
    return this.listingsService.update(id, updateListingDto, userId);
  }

  @Post(':id/publish')
  publish(
    @Param('id', { schema: z.uuid() }) id: string,
    @CurrentUser('id', { schema: z.uuid() }) userId: string
  ) {
    return this.listingsService.updateStatus(id, ListingStatus.Active, userId);
  }

  @Post(':id/archive')
  unpublish(
    @Param('id', { schema: z.uuid() }) id: string,
    @CurrentUser('id', { schema: z.uuid() }) userId: string
  ) {
    return this.listingsService.updateStatus(id, ListingStatus.Archived, userId);
  }
}
