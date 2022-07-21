import { GameRoom } from './typeorm/game-room.entity';
import { Repository } from 'typeorm';
import { CreateGameRoomDto } from './dto/createGameRoom.dto';
import { GameHistory } from './typeorm/game-history.entity';
import { CreateGameHistoryDto } from './dto/createGameHistory.dto';
export declare class PongGameService {
    private roomRepository;
    private gameRepository;
    constructor(roomRepository: Repository<GameRoom>, gameRepository: Repository<GameHistory>);
    getRooms(): Promise<{
        gamesRooms: GameRoom[];
    }>;
    addRoom(Createroom: CreateGameRoomDto): Promise<GameRoom>;
    deleteRoom(roomname: string): Promise<void>;
    getGamesHistory(id: number): Promise<{
        gamesHistory: GameHistory[];
    }>;
    addGameHistory(createGameHistoryDto: CreateGameHistoryDto): Promise<CreateGameHistoryDto>;
}
