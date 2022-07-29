import { BaseEntity } from "typeorm";
import { UserStatus } from "./player_status.enum";
import { Relation } from "../relations/relation.entity";
import { membership } from "src/chat/membership.entity";
import { message } from "src/chat/message.entity";
import { GameHistory } from "src/pong-game/typeorm/game-history.entity";
export declare class Player extends BaseEntity {
    id: number;
    username: string;
    avatar: string;
    level: number;
    wins: number;
    losses: number;
    status: UserStatus;
    last_activity: Date;
    two_fa: boolean;
    secret: string;
    senders: Relation[];
    memberships: membership[];
    messages: message[];
    gameHistory: GameHistory;
}
