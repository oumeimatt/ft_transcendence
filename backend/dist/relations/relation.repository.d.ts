import { Repository } from "typeorm";
import { Player } from "../players/player.entity";
import { GetRelationFilterDto } from "./dto-relation/get-relation-filter.dto";
import { Relation } from "./relation.entity";
export declare class RelationRepository extends Repository<Relation> {
    constructor();
    getRelations(FilterDto: GetRelationFilterDto): Promise<Relation[]>;
    addFriend(user: Player, friend_id: number): Promise<Relation>;
    blockPlayer(user: Player, blocked_id: number): Promise<Relation>;
}
