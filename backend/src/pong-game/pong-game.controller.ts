import { Controller, Get } from '@nestjs/common';
import { PongGameService } from './pong-game.service';
import { Room } from './typeorm/room.entity';

@Controller('pong-game')
export class PongGameController {
  constructor(private pongGameService: PongGameService) {}

  @Get('/rooms')
  getRooms(): Promise< { rooms: Room[] } > {
    return this.pongGameService.getRooms();
  }
}
