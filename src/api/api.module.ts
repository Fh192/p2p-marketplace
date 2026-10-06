import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module.js';
import { GamesModule } from './games/games.module.js';

@Module({
  imports: [AdminModule, GamesModule],
  controllers: [],
  providers: [],
})
export class ApiModule { }
