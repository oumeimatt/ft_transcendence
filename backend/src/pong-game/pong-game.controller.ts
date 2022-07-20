import { Controller, Get, Param, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { PongGameService } from './pong-game.service';
import { GameHistory } from './typeorm/game-history.entity';
import { GameRoom } from './typeorm/game-room.entity';

@Controller('pong-game')
export class PongGameController {
  constructor(private pongGameService: PongGameService) {}

  @Get('/games-rooms')
  getRooms(): Promise< { gamesRooms: GameRoom[] } > {
    return this.pongGameService.getRooms();
  }

  @Get('/games-history/:id')
  @UsePipes(ValidationPipe)
  getGamesHistory( @Param('id', ParseIntPipe) id: number ): Promise< { gamesHistory: GameHistory[] } > {
    return this.pongGameService.getGamesHistory(id);
  }
}
