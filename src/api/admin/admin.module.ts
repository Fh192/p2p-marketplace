import { Module } from '@nestjs/common';
import { CategoriesModule } from '../categories/categories.module.js';
import { GamesModule } from '../games/games.module.js';
import { AdminController } from './admin.controller.js';

@Module({
  imports: [GamesModule, CategoriesModule],
  controllers: [AdminController],
})
export class AdminModule { }
