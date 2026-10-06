import { Controller, Get, Param } from '@nestjs/common';
import { GamesService } from './games.service.js';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) { }

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.gamesService.findOne({ slug });
  }
}
