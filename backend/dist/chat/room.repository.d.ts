import { chatroom } from "./room.entity";
import { Repository } from "typeorm";
import { RoomDto } from "./dto/room-dto";
import { RoleStatus } from "./dto/membership.model";
import { Player } from "src/players/player.entity";
export declare class roomRepository extends Repository<chatroom> {
    createRoom(RoomDto: RoomDto, creators: Player[]): Promise<chatroom>;
    addMember(room: chatroom, creator: Player, role: RoleStatus): Promise<void>;
    getRoomById(id: number): Promise<chatroom>;
    getRoomsForUser(Playerid: number): Promise<void>;
}
