import { Injectable } from '@nestjs/common';
import { Category } from '../categories/entities/category.entity.js';
import { Game } from '../games/entities/game.entity.js';

const CREATED = '2026-01-01T00:00:00.000Z';
const UPDATED = '2026-02-01T00:00:00.000Z';

const gameId = (n: number) => `10000000-0000-4000-8000-${String(n).padStart(12, '0')}`;
const categoryId = (n: number) => `20000000-0000-4000-8000-${String(n).padStart(12, '0')}`;

const GAMES = {
  cs2: gameId(1),
  dota2: gameId(2),
  wow: gameId(3),
  genshin: gameId(4),
  fortnite: gameId(5),
  minecraft: gameId(6),
  stardew: gameId(7),
} as const;

function game(id: string, slug: string, title: string, coverUrl: string | null): Game {
  return { id, slug, title, coverUrl, createdAt: CREATED, updatedAt: UPDATED };
}

let categorySeq = 0;
function category(gameId: string, slug: string, title: string): Category {
  categorySeq += 1;
  return { id: categoryId(categorySeq), gameId, slug, title, createdAt: CREATED, updatedAt: UPDATED };
}

@Injectable()
export class DbService {
  games: Game[] = [
    game(GAMES.cs2, 'cs2', 'Counter-Strike 2', 'https://placehold.co/300x400?text=CS2'),
    game(GAMES.dota2, 'dota-2', 'Dota 2', 'https://placehold.co/300x400?text=Dota+2'),
    game(GAMES.wow, 'world-of-warcraft', 'World of Warcraft', 'https://placehold.co/300x400?text=WoW'),
    game(GAMES.genshin, 'genshin-impact', 'Genshin Impact', 'https://placehold.co/300x400?text=Genshin'),
    game(GAMES.fortnite, 'fortnite', 'Fortnite', 'https://placehold.co/300x400?text=Fortnite'),
    game(GAMES.minecraft, 'minecraft', 'Minecraft', null),
    game(GAMES.stardew, 'stardew-valley', 'Stardew Valley', null),
  ];

  categories: Category[] = [
    category(GAMES.cs2, 'skins', 'Скины'),
    category(GAMES.cs2, 'accounts', 'Аккаунты'),
    category(GAMES.cs2, 'keys', 'Ключи'),
    category(GAMES.cs2, 'cases', 'Кейсы'),

    category(GAMES.dota2, 'skins', 'Предметы'),
    category(GAMES.dota2, 'accounts', 'Аккаунты'),
    category(GAMES.dota2, 'boosting', 'Буст рейтинга'),

    category(GAMES.wow, 'currency', 'Золото'),
    category(GAMES.wow, 'accounts', 'Аккаунты'),
    category(GAMES.wow, 'boosting', 'Прокачка'),
    category(GAMES.wow, 'items', 'Предметы'),

    category(GAMES.genshin, 'accounts', 'Аккаунты'),
    category(GAMES.genshin, 'currency', 'Кристаллы'),

    category(GAMES.fortnite, 'currency', 'V-Bucks'),
    category(GAMES.fortnite, 'accounts', 'Аккаунты'),

    category(GAMES.minecraft, 'keys', 'Лицензионные ключи'),

  ];
}
