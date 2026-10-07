import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module.js';
import { DbModule } from './db/db.module.js';
import { PublicModule } from './public/public.module.js';

@Module({
  imports: [DbModule, AdminModule, PublicModule],
  controllers: [],
  providers: [],
})
export class ApiModule { }
