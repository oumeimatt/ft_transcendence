import { PongGameService } from './pong-game.service';
import { GameHistory } from './typeorm/game-history.entity';
import { GameRoom } from './typeorm/game-room.entity';
export declare class PongGameController {
    private pongGameService;
    constructor(pongGameService: PongGameService);
    getRooms(): Promise<{
        gamesRooms: GameRoom[];
    }>;
    getGamesHistory(id: number): Promise<{
        gamesHistory: GameHistory[];
    }>;
}
