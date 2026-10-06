import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module.js';
import { CategoriesService } from './categories.service.js';

@Module({
  imports: [DbModule],
  providers: [CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule { }
