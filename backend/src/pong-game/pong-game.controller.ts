import { Controller, Get } from '@nestjs/common';
import { PongGameService } from './pong-game.service';
import { GameRoom } from './typeorm/game-room.entity';

@Controller('pong-game')
export class PongGameController {
  constructor(private pongGameService: PongGameService) {}

  @Get('/games-rooms')
  getRooms(): Promise< { gamesRooms: GameRoom[] } > {
    return this.pongGameService.getRooms();
  }
}
