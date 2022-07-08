import { PongGameService } from './pong-game.service';
import { Room } from './typeorm/room.entity';
export declare class PongGameController {
    private pongGameService;
    constructor(pongGameService: PongGameService);
    getRooms(): Promise<{
        rooms: Room[];
    }>;
}
