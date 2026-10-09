import type { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto.js';
import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { GamesService } from '../games/games.service.js';
import { CategoriesRepository } from './categories.repository.js';
import { Category } from './entities/category.entity.js';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly gamesService: GamesService
  ) { }

  private checkSlug(gameId: string, slug: string) {
    const isSlugAlreadyExists = this.findGameCategories(gameId).some((category) => category.slug === slug);
    if (isSlugAlreadyExists) {
      throw new UnprocessableEntityException(`Category with slug "${slug}" already exists for game with id "${gameId}"`);
    }
  }

  checkIsCategoryBelongGame(categoryId: string, gameId: string) {
    const category = this.findOne(categoryId);

    if (category.gameId !== gameId) {
      throw new BadRequestException('Category does not belong to game');
    }
  }

  create(gameId: string, createCategoryDto: CreateCategoryDto) {
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
    return this.categoriesRepository.findGameCategories(gameId);
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

    const updatedCategory = this.categoriesRepository.update(id, updateCategoryDto);

    if (!updatedCategory) {
      throw new NotFoundException('Category not found');
    }

    return updatedCategory;
  }

  remove(id: string) {
    const success = this.categoriesRepository.remove(id);

    if (!success) {
      throw new NotFoundException('Category not found');
    }
  }
}
