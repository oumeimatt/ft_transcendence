import { PongGameService } from './pong-game.service';
import { GameRoom } from './typeorm/game-room.entity';
export declare class PongGameController {
    private pongGameService;
    constructor(pongGameService: PongGameService);
    getRooms(): Promise<{
        gamesRooms: GameRoom[];
    }>;
}
