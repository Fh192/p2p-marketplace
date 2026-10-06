import type { CreateCategoryDto, UpdateCategoryDto } from './dto/create-category.dto.js';
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DB_SERVICE_TOKEN } from '../db/db.module.js';
import { DbService } from '../db/db.service.js';

@Injectable()
export class CategoriesService {
  constructor(@Inject(DB_SERVICE_TOKEN) private readonly dbService: DbService) { }

  private checkSlug(gameId: string, slug: string) {
    const isSlugAlreadyExists = this.findGameCategories(gameId).some((game) => game.slug === slug);
    if (isSlugAlreadyExists) {
      throw new ConflictException(`Category with slug "${slug}" already exists for game with id "${gameId}"`);
    }
  }

  private checkGame(gameId: string) {
    const isGameExists = this.dbService.games.some((game) => game.id === gameId);

    if (!isGameExists) {
      throw new NotFoundException('Game not found');
    }
  }

  create(gameId: string, createCategoryDto: CreateCategoryDto) {
    this.checkGame(gameId);
    this.checkSlug(gameId, createCategoryDto.slug);

    this.dbService.categories.push({
      id: uuidv4(),
      gameId,
      ...createCategoryDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return this.dbService.categories;
  }

  findGameCategories(gameId: string) {
    return this.dbService.categories.filter((category) => category.gameId === gameId);
  }

  findAll() {
    return this.dbService.categories;
  }

  findOne(id: string) {
    const category = this.dbService.categories.find((category) => category.id === id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const categoryIndex = this.dbService.categories.findIndex((category) => category.id === id);

    if (categoryIndex === -1) {
      throw new NotFoundException('Category not found');
    }

    const category = this.dbService.categories[categoryIndex];
    const newSlug = updateCategoryDto.slug;

    if (newSlug && newSlug !== category.slug) {
      this.checkSlug(category.gameId, newSlug);
    }

    // Do i need to check for undefined fields?
    Object.assign(category, updateCategoryDto);

    return this.dbService.categories;
  }

  remove(id: string) {
    const categoryIndex = this.dbService.categories.findIndex((category) => category.id === id);

    if (categoryIndex === -1) {
      throw new NotFoundException('Category not found');
    }

    this.dbService.categories.splice(categoryIndex, 1);

    return this.dbService.categories;
  }
}
