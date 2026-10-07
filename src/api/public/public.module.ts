import { Module } from '@nestjs/common';
import { CategoriesModule } from '../categories/categories.module.js';
import { GamesModule } from '../games/games.module.js';
import { PublicController } from './public.controller.js';

@Module({
  imports: [GamesModule, CategoriesModule],
  controllers: [PublicController]
})
export class PublicModule { }
