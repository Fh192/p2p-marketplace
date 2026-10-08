import type { CreateListingDto, UpdateListingDto } from './dto/listings.dto.js';
import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import z from 'zod';
import { createListingSchema, updateListingSchema } from './dto/listings.dto.js';
import { ListingStatus } from './listing-status.js';
import { ListingsService } from './listings.service.js';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) { }

  @Post()
  create(@Body({ schema: createListingSchema }) createListingDto: CreateListingDto) {
    return this.listingsService.create(createListingDto);
  }

  @Patch(':id')
  update(@Param('id', { schema: z.uuid() }) id: string, @Body({ schema: updateListingSchema }) updateListingDto: UpdateListingDto) {
    return this.listingsService.update(id, updateListingDto);
  }

  @Patch(':id/publish')
  publish(@Param('id', { schema: z.uuid() }) id: string) {
    return this.listingsService.updateStatus(id, ListingStatus.Active, 'seller');
  }

  @Patch(':id/archive')
  unpublish(@Param('id', { schema: z.uuid() }) id: string) {
    return this.listingsService.updateStatus(id, ListingStatus.Archived, 'seller');
  }
}
