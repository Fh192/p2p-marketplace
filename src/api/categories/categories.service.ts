import type { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto.js';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { GamesService } from '../games/games.service.js';
import { CategoriesRepository } from './categories.repository.js';
import { Category } from './entities/category.entity.js';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository, private readonly gamesService: GamesService) { }

  private checkSlug(gameId: string, slug: string) {
    const isSlugAlreadyExists = this.findGameCategories(gameId).some((game) => game.slug === slug);
    if (isSlugAlreadyExists) {
      throw new ConflictException(`Category with slug "${slug}" already exists for game with id "${gameId}"`);
    }
  }

  create(gameId: string, createCategoryDto: CreateCategoryDto) {
    this.gamesService.checkGameExistence(gameId);
    this.checkSlug(gameId, createCategoryDto.slug);

    const newCategory: Category = {
      ...createCategoryDto,
      id: crypto.randomUUID(),
      gameId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.categoriesRepository.create(newCategory);

    return newCategory;
  }

  findGameCategories(gameId: string) {
    this.gamesService.checkGameExistence(gameId);
    return this.categoriesRepository.findAll().filter((category) => category.gameId === gameId);
  }

  findAll() {
    return this.categoriesRepository.findAll();
  }

  findOne(id: string) {
    const category = this.categoriesRepository.findOne(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = this.categoriesRepository.findOne(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const newSlug = updateCategoryDto.slug;

    if (newSlug && newSlug !== category.slug) {
      this.checkSlug(category.gameId, newSlug);
    }

    return this.categoriesRepository.update(id, updateCategoryDto);
  }

  remove(id: string) {
    this.categoriesRepository.remove(id);
  }
}
