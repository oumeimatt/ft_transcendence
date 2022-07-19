import { GameRoom } from './typeorm/game-room.entity';
import { Repository } from 'typeorm';
import { CreateGameRoomDto } from './dto/createGameRoom.dto';
export declare class PongGameService {
    private roomRepository;
    constructor(roomRepository: Repository<GameRoom>);
    getRooms(): Promise<{
        rooms: GameRoom[];
    }>;
    addRoom(Createroom: CreateGameRoomDto): Promise<GameRoom>;
    deleteRoom(roomname: string): Promise<void>;
}
