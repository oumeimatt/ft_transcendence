import { Relation } from "./relation.entity";
import { RelationsService } from "./relations.service";
import { Request } from "express";
import { UsersService } from "../players/players.service";
export declare class RelationsController {
    private readonly relationService;
    private readonly usersService;
    constructor(relationService: RelationsService, usersService: UsersService);
    addFriend(req: Request, friend_id: number): Promise<Relation>;
    blockPlayer(req: Request, blocked_id: number): Promise<Relation>;
    unblock(req: Request, unblock_id: number): Promise<void>;
    removeFriend(req: Request, unfollow_id: number): Promise<void>;
}
