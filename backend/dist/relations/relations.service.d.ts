import { Player } from "../players/player.entity";
import { UsersService } from "../players/players.service";
import { GetRelationFilterDto } from "./dto-relation/get-relation-filter.dto";
import { Relation } from "./relation.entity";
import { RelationRepository } from "./relation.repository";
import { RelationStatus } from "./relation_status.enum";
export declare class RelationsService {
    private relationRepository;
    private readonly usersService;
    constructor(relationRepository: RelationRepository, usersService: UsersService);
    getRelations(FilterDto: GetRelationFilterDto): Promise<Relation[]>;
    getRelationByUser(user: Player, relation_status: RelationStatus): Promise<Relation[]>;
    getAllFriends(user: Player): Promise<Player[]>;
    addFriend(user: Player, friend_id: number): Promise<Relation>;
    blockPlayer(user: Player, blocked_id: number): Promise<Relation>;
    unblock(user: Player, blocked_id: number): Promise<void>;
    removeFriend(user: Player, friend_id: number): Promise<void>;
}
