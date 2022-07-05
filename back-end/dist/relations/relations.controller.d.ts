import { Player } from "../players/player.entity";
import { Relation } from "./relation.entity";
import { RelationsService } from "./relations.service";
export declare class RelationsController {
    private readonly relationService;
    constructor(relationService: RelationsService);
    getRelationByUser(player: Player): Promise<Relation[]>;
    addFriend(recv_id: number, sender: Player): Promise<Relation>;
    blockPlayer(recv_id: number, sender: Player): Promise<Relation>;
    unblock(sender: Player): Promise<void>;
    removeFriend(sender: Player): Promise<void>;
}
