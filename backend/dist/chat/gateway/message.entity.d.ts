import { Player } from "src/players/player.entity";
import { BaseEntity } from "typeorm";
import { room } from "../room.entity";
export declare class message extends BaseEntity {
    id: number;
    content: string;
    created_at: Date;
    playerid: number;
    roomid: number;
    room: room;
    Player: Player;
}
