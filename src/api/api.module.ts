import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module.js';
import { DbModule } from './db/db.module.js';
import { GamesModule } from './games/games.module.js';

@Module({
  imports: [DbModule, AdminModule, GamesModule],
  controllers: [],
  providers: [],
})
export class ApiModule { }
