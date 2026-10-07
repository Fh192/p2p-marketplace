import { Inject, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service.js';
import { DB_SERVICE_TOKEN } from '../db/db.tokens.js';
import { Game } from './entities/game.entity.js';

@Injectable()
export class GamesRepository {
  constructor(@Inject(DB_SERVICE_TOKEN) private readonly dbService: DbService) { }

  create(game: Game) {
    this.dbService.games.push(game);
  }

  findAll(): Game[] {
    return this.dbService.games;
  }

  findOneBy(query: { slug: string } | { id: string }): Game | null {
    return this.dbService.games.find((game) => {
      if ('slug' in query) {
        return game.slug === query.slug;
      }

      return game.id === query.id;
    }) ?? null;
  }

  update(id: string, game: Partial<Game>): Game | null {
    const gameIndex = this.dbService.games.findIndex((game) => game.id === id);

    if (gameIndex === -1) {
      return null;
    }

    return Object.assign(
      this.dbService.games[gameIndex],
      game,
      { updatedAt: new Date().toISOString() }
    );
  }

  remove(id: string): boolean {
    const gameIndex = this.dbService.games.findIndex((game) => game.id === id);

    if (gameIndex === -1) {
      return false;
    }

    this.dbService.games.splice(gameIndex, 1);

    return true;
  }
}
