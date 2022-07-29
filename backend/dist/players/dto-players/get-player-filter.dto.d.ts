import { UserStatus } from "../player_status.enum";
export declare class GetPlayersFilterDto {
    id: number;
    username: string;
    level: number;
    status: UserStatus;
}
