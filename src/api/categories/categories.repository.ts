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

  findAll() {
    return this.dbService.categories;
  }

  findOne(id: string) {
    return this.dbService.categories.find((category) => category.id === id);
  }

  findGameCategories(gameId: string) {
    return this.dbService.categories.filter((category) => category.gameId === gameId);
  }

  update(id: string, category: Partial<Category>) {
    const categoryIndex = this.dbService.categories.findIndex((category) => category.id === id);

    if (categoryIndex === -1) {
      return false;
    }

    return Object.assign(
      this.dbService.categories[categoryIndex],
      category,
      { updatedAt: new Date().toISOString() }
    );
  }

  remove(id: string) {
    const categoryIndex = this.dbService.categories.findIndex((category) => category.id === id);

    if (categoryIndex === -1) {
      return false;
    }

    this.dbService.categories.splice(categoryIndex, 1);
  }
}
