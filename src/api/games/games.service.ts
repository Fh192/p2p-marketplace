import type { Game } from './entities/game.entity.js';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from '../categories/categories.repository.js';
import { CreateGameDto, UpdateGameDto } from './dto/game.dto.js';
import { GamesRepository } from './games.repository.js';

@Injectable()
export class GamesService {
  constructor(private readonly gamesRepository: GamesRepository, private readonly categoriesRepository: CategoriesRepository) { }

  private checkSlug(slug: string) {
    const isSlugAlreadyExists = this.gamesRepository.findAll().some((game) => game.slug === slug);
    if (isSlugAlreadyExists) {
      throw new ConflictException(`Game with slug "${slug}" already exists`);
    }
  }

  checkGameExistence(id: string) {
    const game = this.gamesRepository.findOneBy({ id });

    if (!game) {
      throw new NotFoundException('Game not found');
    }
  }

  create(createGameDto: CreateGameDto) {
    this.checkSlug(createGameDto.slug);

    const newGame: Game = {
      ...createGameDto,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.gamesRepository.create(newGame);

    return newGame;
  }

  findAll() {
    return this.gamesRepository.findAll();
  }

  findOne(query: { slug: string } | { id: string }) {
    const game = this.gamesRepository.findOneBy(query);

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    const categories = this.categoriesRepository.findAll().filter((category) => category.gameId === game.id);

    return { ...game, categories };
  }

  update(id: string, updateGameDto: UpdateGameDto) {
    const game = this.gamesRepository.findOneBy({ id });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    const newSlug = updateGameDto.slug;

    if (newSlug && newSlug !== game.slug) {
      this.checkSlug(newSlug);
    }

    return this.gamesRepository.update(id, updateGameDto);
  }

  remove(id: string) {
    this.gamesRepository.remove(id);
  }
}
