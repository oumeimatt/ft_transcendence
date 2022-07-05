import { BaseEntity } from "typeorm";
import { message } from "./gateway/message.entity";
import { membership } from "./membership.entity";
export declare class room extends BaseEntity {
    id: number;
    name: string;
    ischannel: boolean;
    ispublic: boolean;
    password: string;
    memberships: membership[];
    messages: message[];
    create_at: Date;
    updated_at: Date;
}
