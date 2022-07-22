import { Player } from "src/players/player.entity";
import { BaseEntity } from "typeorm";
import { RoleStatus } from "./dto/membership.model";
import { chatroom } from "./room.entity";
export declare class membership extends BaseEntity {
    id_membership: number;
    role: RoleStatus;
    playerid: number;
    Player: Player;
    roomid: number;
    room: chatroom;
}
