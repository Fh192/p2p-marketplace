import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module.js';
import { CategoriesModule } from './api/categories/categories.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DbService } from './api/db/db.service.js';
import { DbModule } from './api/db/db.module.js';

@Module({
  imports: [ApiModule, CategoriesModule, DbModule],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule { }
