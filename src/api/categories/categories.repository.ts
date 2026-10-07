import { Inject, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service.js';
import { DB_SERVICE_TOKEN } from '../db/db.tokens.js';
import { Category } from './entities/category.entity.js';

@Injectable()
export class CategoriesRepository {
  constructor(@Inject(DB_SERVICE_TOKEN) private readonly dbService: DbService) { }

  create(category: Category) {
    this.dbService.categories.push(category);
  }

  findAll(): Category[] {
    return this.dbService.categories;
  }

  findOne(id: string): Category | null {
    return this.dbService.categories.find((category) => category.id === id) ?? null;
  }

  findGameCategories(gameId: string): Category[] {
    return this.dbService.categories.filter((category) => category.gameId === gameId);
  }

  update(id: string, category: Partial<Category>): Category | null {
    const categoryIndex = this.dbService.categories.findIndex((category) => category.id === id);

    if (categoryIndex === -1) {
      return null;
    }

    return Object.assign(
      this.dbService.categories[categoryIndex],
      category,
      { updatedAt: new Date().toISOString() }
    );
  }

  remove(id: string): boolean {
    const categoryIndex = this.dbService.categories.findIndex((category) => category.id === id);

    if (categoryIndex === -1) {
      return false;
    }

    this.dbService.categories.splice(categoryIndex, 1);

    return true;
  }
}
