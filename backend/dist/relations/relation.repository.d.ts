import { Repository } from "typeorm";
import { Player } from "../players/player.entity";
import { UsersService } from "../players/players.service";
import { GetRelationFilterDto } from "./dto-relation/get-relation-filter.dto";
import { Relation } from "./relation.entity";
import { RelationStatus } from "./relation_status.enum";
export declare class RelationRepository extends Repository<Relation> {
    private userService;
    constructor(userService: UsersService);
    getRelations(FilterDto: GetRelationFilterDto): Promise<Relation[]>;
    getRelationByUser(player_id: number, relation_status: RelationStatus): Promise<Relation[]>;
    getOneRelation(player_id: number, relation_status: RelationStatus): Promise<Relation>;
    addFriend(recv_id: number, sender: Player): Promise<Relation>;
    blockPlayer(recv_id: number, sender: Player): Promise<Relation>;
}
