import { BaseEntity } from "typeorm";
import { UserStatus } from "./player_status.enum";
import { Relation } from "../relations/relation.entity";
export declare class Player extends BaseEntity {
    id: number;
    username: string;
    avatar: string;
    level: number;
    wins: number;
    losses: number;
    status: UserStatus;
    two_fa: boolean;
    senders: Relation[];
}
