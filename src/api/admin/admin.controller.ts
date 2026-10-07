import type { CreateCategoryDto, UpdateCategoryDto } from '../categories/dto/category.dto.js';
import type { CreateGameDto, UpdateGameDto } from '../games/dto/game.dto.js';
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import z from 'zod';
import { CategoriesService } from '../categories/categories.service.js';
import { createCategorySchema, updateCategorySchema } from '../categories/dto/category.dto.js';
import { createGameSchema, updateGameSchema } from '../games/dto/game.dto.js';
import { GamesService } from '../games/games.service.js';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly gamesService: GamesService,
    private readonly categoryService: CategoriesService
  ) { }

  @Post('games')
  createGame(@Body({ schema: createGameSchema }) createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Patch('games/:id')
  updateGame(@Param('id', { schema: z.uuid() }) id: string, @Body({ schema: updateGameSchema }) updateGameDto: UpdateGameDto) {
    return this.gamesService.update(id, updateGameDto);
  }

  @Delete('games/:id')
  @HttpCode(204)
  removeGame(@Param('id', { schema: z.uuid() }) id: string) {
    return this.gamesService.remove(id);
  }

  @Post('games/:gameId/categories')
  createGameCategory(@Param('gameId', { schema: z.uuid() }) gameId: string, @Body({ schema: createCategorySchema }) createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(gameId, createCategoryDto);
  }

  @Get('games/:gameId/categories')
  findGameCategories(@Param('gameId', { schema: z.uuid() }) gameId: string) {
    return this.categoryService.findGameCategories(gameId);
  }

  @Get('categories/:id')
  findCategory(@Param('id', { schema: z.uuid() }) id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch('categories/:id')
  updateCategory(@Param('id', { schema: z.uuid() }) id: string, @Body({ schema: updateCategorySchema }) updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete('categories/:id')
  @HttpCode(204)
  deleteCategory(@Param('id', { schema: z.uuid() }) id: string) {
    return this.categoryService.remove(id);
  }
}
