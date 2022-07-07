import { BaseEntity } from "typeorm";
import { UserStatus } from "./player_status.enum";
import { Relation } from "../relations/relation.entity";
import { membership } from "src/chat/membership.entity";
import { message } from "src/chat/gateway/message.entity";
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
    memberships: membership[];
    messages: message[];
}
