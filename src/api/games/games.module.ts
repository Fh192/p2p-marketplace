import { Module } from '@nestjs/common';
import { CategoriesRepository } from '../categories/categories.repository.js';
import { GamesController } from './games.controller.js';
import { GamesRepository } from './games.repository.js';
import { GamesService } from './games.service.js';

@Module({
  // imports: [DbModule],
  controllers: [GamesController],
  providers: [GamesService, GamesRepository, CategoriesRepository],
  exports: [GamesService]
})
export class GamesModule { }
