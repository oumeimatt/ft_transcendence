import { UsersService } from "./players.service";
import { GetPlayersFilterDto } from "./dto-players/get-player-filter.dto";
import { RelationsService } from "../relations/relations.service";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
export declare class UsersController {
    private readonly usersService;
    private readonly relationService;
    private jwtService;
    constructor(usersService: UsersService, relationService: RelationsService, jwtService: JwtService);
    getProfile(req: Request): Promise<{
        profile: import("./player.entity").Player;
        friends: import("./player.entity").Player[];
        achievements: any;
    }>;
    getFriendProfile(req: Request, id: number): Promise<{
        profile: import("./player.entity").Player;
        friends: import("./player.entity").Player[];
        achievements: any;
    }>;
    updateUsername(req: Request, username: string): Promise<import("./player.entity").Player>;
    updateAvatar(req: Request, avatar: string): Promise<import("./player.entity").Player>;
    updateTwoFa(req: Request): Promise<import("./player.entity").Player>;
    getUsers(FilterDto: GetPlayersFilterDto): Promise<import("./player.entity").Player[]>;
}
