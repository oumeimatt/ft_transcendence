/// <reference types="multer" />
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
    playerAuth(req: Request): Promise<{
        profile: import("./player.entity").Player;
    }>;
    getProfile(req: Request): Promise<{
        profile: import("./player.entity").Player;
        wins: number;
        losses: number;
        friends: import("./player.entity").Player[];
        blockedUsers: import("./player.entity").Player[];
        achievements: any;
        cookie: any;
    }>;
    getFriendProfile(req: Request, id: number): Promise<{
        profile: import("./player.entity").Player;
        friends: import("./player.entity").Player[];
        blockedUsers: import("./player.entity").Player[];
        achievements: any;
    }>;
    updateUsername(req: Request, username: string): Promise<import("./player.entity").Player>;
    updateAvatar(req: Request, imageName: string, avatar: Express.Multer.File): Promise<import("./player.entity").Player>;
    updateTwoFa(req: Request): Promise<string>;
    twoFactorEnable(req: Request, Password2fa: string): Promise<void>;
    twoFactorAuthenticate(req: Request, res: any, code: string): Promise<any>;
    getUsers(FilterDto: GetPlayersFilterDto, req: Request): Promise<import("./player.entity").Player[]>;
}
