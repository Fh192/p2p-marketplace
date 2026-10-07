import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service.js';
import { DB_SERVICE_TOKEN } from './db.tokens.js';

@Global()
@Module({
  providers: [{
    provide: DB_SERVICE_TOKEN,
    useClass: DbService
  }],
  exports: [DB_SERVICE_TOKEN]
})
export class DbModule { }
