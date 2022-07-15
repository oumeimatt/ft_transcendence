import { Room } from './typeorm/room.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/createRoom.dt';
export declare class PongGameService {
    private roomRepository;
    constructor(roomRepository: Repository<Room>);
    getRooms(): Promise<{
        rooms: Room[];
    }>;
    addRoom(Createroom: CreateRoomDto): Promise<Room>;
    deleteRoom(roomname: string): Promise<void>;
}
