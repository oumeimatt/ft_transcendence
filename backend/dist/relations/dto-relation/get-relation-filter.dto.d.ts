import { Player } from "../../players/player.entity";
import { RelationStatus } from "../relation_status.enum";
export declare class GetRelationFilterDto {
    id: number;
    status: RelationStatus;
    receiver: number;
    sender: Player;
}
