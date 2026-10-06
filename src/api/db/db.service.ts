import { Injectable } from '@nestjs/common';
import { Category } from '../categories/entities/category.entity.js';
import { Game } from '../games/entities/game.entity.js';

@Injectable()
export class DbService {
    games: Game[] = [
        {
            id: '66498929-1786-449e-8030-02506145751e',
            slug: 'minecraft',
            title: 'Minecraft',
            coverUrl: 'https://via.placeholder.com/150',
            createdAt: '2026-01-01T00:00:00.000Z',
            updatedAt: '2026-02-04T00:00:00.000Z',
        },
        {
            id: '66498929-1786-449e-8030-02506145751f',
            slug: 'fortnite',
            title: 'Fortnite',
            coverUrl: 'https://via.placeholder.com/150',
            createdAt: '2026-01-01T00:00:00.000Z',
            updatedAt: '2026-02-04T00:00:00.000Z',
        },
        {
            id: '66498929-1786-449e-8030-02506145751g',
            slug: 'call-of-duty',
            title: 'Call of Duty',
            coverUrl: 'https://via.placeholder.com/150',
            createdAt: '2026-01-01T00:00:00.000Z',
            updatedAt: '2026-02-04T00:00:00.000Z',
        },
    ];

    categories: Category[] = [
        {
            id: '66498929-1786-449e-8030-02506145751f',
            gameId: '66498929-1786-449e-8030-02506145751e',
            slug: 'skins',
            title: 'Скины',
            createdAt: '2026-01-01T00:00:00.000Z',
            updatedAt: '2026-02-04T00:00:00.000Z',
        },
        {
            id: '66498929-1786-449e-8030-02506145751f',
            gameId: '66498929-1786-449e-8030-02506145751e',
            slug: 'accounts',
            title: 'Аккаунты',
            createdAt: '2026-01-01T00:00:00.000Z',
            updatedAt: '2026-02-04T00:00:00.000Z',
        },
        {
            id: '66498929-1786-449e-8030-025061457520',
            gameId: '66498929-1786-449e-8030-02506145751e',
            slug: 'currency',
            title: 'Валюта',
            createdAt: '2026-01-01T00:00:00.000Z',
            updatedAt: '2026-02-04T00:00:00.000Z',
        },
        {
            id: '66498929-1786-449e-8030-025061457521',
            gameId: '66498929-1786-449e-8030-02506145751f',
            slug: 'keys',
            title: 'Ключи',
            createdAt: '2026-01-01T00:00:00.000Z',
            updatedAt: '2026-02-04T00:00:00.000Z',
        },
    ];
}
