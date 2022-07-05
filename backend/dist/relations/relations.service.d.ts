import { Player } from "../players/player.entity";
import { GetRelationFilterDto } from "./dto-relation/get-relation-filter.dto";
import { Relation } from "./relation.entity";
import { RelationRepository } from "./relation.repository";
import { RelationStatus } from "./relation_status.enum";
export declare class RelationsService {
    private relationRepository;
    constructor(relationRepository: RelationRepository);
    getRelations(FilterDto: GetRelationFilterDto): Promise<Relation[]>;
    getRelationByUser(player_id: number, relation_status: RelationStatus): Promise<Relation[]>;
    addFriend(recv_id: number, sender: Player): Promise<Relation>;
    blockPlayer(recv_id: number, sender: Player): Promise<Relation>;
    unblock(id: number): Promise<void>;
    removeFriend(id: number): Promise<void>;
}
