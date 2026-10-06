import { Module } from '@nestjs/common';
import { DbService } from './db.service.js';

export const DB_SERVICE_TOKEN = 'DB_SERVICE_TOKEN';

@Module({
  providers: [{
    provide: DB_SERVICE_TOKEN,
    useFactory() {
      const dbService = new DbService();
      return dbService;
    }
  }],
  exports: [DB_SERVICE_TOKEN]
})
export class DbModule { }
