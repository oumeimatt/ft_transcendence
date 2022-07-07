import { room } from "./room.entity";
import { Repository } from "typeorm";
import { RoomDto } from "./dto/room-dto";
import { RoleStatus } from "./dto/membership.model";
import { Player } from "src/players/player.entity";
export declare class roomRepository extends Repository<room> {
    createRoom(RoomDto: RoomDto, creators: Player[]): Promise<room>;
    addMember(room: room, creator: Player, role: RoleStatus): Promise<void>;
    getRoomById(id: number): Promise<room>;
    getRoomsForUser(Playerid: number): Promise<void>;
}
