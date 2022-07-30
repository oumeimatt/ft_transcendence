import { Player } from "src/players/player.entity";
import { RoleStatus } from "./membership.model";
export declare class memberDto {
    member: Player;
    role: RoleStatus;
    isbanned: boolean;
    ismuted: boolean;
}
