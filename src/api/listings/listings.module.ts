import { Module } from '@nestjs/common';
import { CategoriesModule } from '../categories/categories.module.js';
import { GamesModule } from '../games/games.module.js';
import { ListingsController } from './listings.controller.js';
import { ListingsRepository } from './listings.repository.js';
import { ListingsService } from './listings.service.js';

@Module({
  imports: [GamesModule, CategoriesModule],
  controllers: [ListingsController],
  providers: [ListingsService, ListingsRepository],
})
export class ListingsModule { }
