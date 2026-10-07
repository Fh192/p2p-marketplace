import { Module } from '@nestjs/common';
import { GamesRepository } from './games.repository.js';
import { GamesService } from './games.service.js';

@Module({
  providers: [GamesService, GamesRepository],
  exports: [GamesService]
})
export class GamesModule { }
