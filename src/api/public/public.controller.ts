import { Controller, Get, Param } from '@nestjs/common';
import { slugSchema } from '../../shared/zod.js';
import { CategoriesService } from '../categories/categories.service.js';
import { GamesService } from '../games/games.service.js';

@Controller('public')
export class PublicController {
  constructor(
    private readonly gamesService: GamesService,
    private readonly categoryService: CategoriesService
  ) { }

  @Get('games')
  findAll() {
    return this.gamesService.findAll();
  }

  @Get('games/:slug')
  findOne(@Param('slug', { schema: slugSchema }) slug: string) {
    const game = this.gamesService.findOne({ slug });
    const categories = this.categoryService.findGameCategories(game.id);

    return Object.assign(game, { categories });
  }
}
