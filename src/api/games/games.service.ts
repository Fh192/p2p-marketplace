import type { Game } from './entities/game.entity.js';
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DB_SERVICE_TOKEN } from '../db/db.module.js';
import { DbService } from '../db/db.service.js';
import { CreateGameDto, UpdateGameDto } from './dto/create-game.dto.js';

@Injectable()
export class GamesService {
  constructor(@Inject(DB_SERVICE_TOKEN) private readonly dbService: DbService) { }

  private checkSlug(slug: string) {
    const isSlugAlreadyExists = this.dbService.games.some((game) => game.slug === slug);
    if (isSlugAlreadyExists) {
      throw new ConflictException(`Game with slug "${slug}" already exists`);
    }
  }

  create(createGameDto: CreateGameDto) {
    this.checkSlug(createGameDto.slug);

    const newGame: Game = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...createGameDto,
    };

    this.dbService.games.push(newGame);

    return this.dbService.games;
  }

  findAll() {
    return this.dbService.games;
  }

  findOne(query: { slug: string } | { id: string }) {
    const game = this.dbService.games.find((game) => {
      if ('slug' in query) {
        return game.slug === query.slug;
      }

      return game.id === query.id;
    });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    const categories = this.dbService.categories.filter((category) => category.gameId === game.id);

    return { ...game, categories };
  }

  update(id: string, updateGameDto: UpdateGameDto) {
    const gameIndex = this.dbService.games.findIndex((game) => game.id === id);

    if (gameIndex === -1) {
      throw new NotFoundException('Game not found');
    }

    const game = this.dbService.games[gameIndex];
    const newSlug = updateGameDto.slug;

    if (newSlug && newSlug !== game.slug) {
      this.checkSlug(newSlug);
    }

    // Do i need to check for undefined fields?
    Object.assign(game, updateGameDto);

    return this.dbService.games;
  }

  remove(id: string) {
    const gameIndex = this.dbService.games.findIndex((game) => game.id === id);

    if (gameIndex === -1) {
      throw new NotFoundException('Game not found');
    }

    this.dbService.games.splice(gameIndex, 1);

    return this.dbService.games;
  }
}
