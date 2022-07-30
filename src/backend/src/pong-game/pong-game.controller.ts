import { Controller, Get, Param, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { PongGameService } from './pong-game.service';
import { GameHistory } from './typeorm/game-history.entity';
import { GameRoom } from './typeorm/game-room.entity';

@Controller('pong-game')
export class PongGameController {
  constructor(private pongGameService: PongGameService) {}

  @Get('/games-rooms')
  async getRooms(): Promise< { gamesRooms: GameRoom[] } > {
    return await this.pongGameService.getRooms();
  }

  @Get('/games-history/:id')
  @UsePipes(ValidationPipe)
  async getGamesHistory( @Param('id', ParseIntPipe) id: number ): Promise< { gamesHistory: GameHistory[] } > {
    return await this.pongGameService.getGamesHistory(id);
  }
}
