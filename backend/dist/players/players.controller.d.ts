import { Player } from "./player.entity";
import { UsersService } from "./players.service";
import { GetPlayersFilterDto } from "./dto-players/get-player-filter.dto";
import { RelationsService } from "../relations/relations.service";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
export declare class UsersController {
    private readonly usersService;
    private readonly relationService;
    private jwtService;
    constructor(usersService: UsersService, relationService: RelationsService, jwtService: JwtService);
    getProfile(req: Request): Promise<{
        profile: Player;
        achievements: any;
    }>;
    getFriendProfile(req: Request, id: number): Promise<{
        profile: Player;
        achievements: any;
    }>;
    updateUsername(req: Request, username: string): Promise<Player>;
    updateAvatar(req: Request, avatar: string): Promise<Player>;
    updateTwoFa(req: Request): Promise<Player>;
    getUsers(FilterDto: GetPlayersFilterDto): Promise<Player[]>;
}
