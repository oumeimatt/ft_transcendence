import { JwtService } from "@nestjs/jwt";
import { GetPlayersFilterDto } from "./dto-players/get-player-filter.dto";
import { Player } from "./player.entity";
import { PlayerRepository } from "./player.repository";
import { UserStatus } from "./player_status.enum";
export declare class UsersService {
    private userRepository;
    private jwtService;
    constructor(userRepository: PlayerRepository, jwtService: JwtService);
    getStatusByUserId(id: number): Promise<UserStatus>;
    getUserById(id: number): Promise<Player>;
    getUserByUsername(username: string): Promise<Player>;
    getUserByStatusId(id: number): Promise<Player>;
    getUsers(FilterDto: GetPlayersFilterDto): Promise<Player[]>;
    firstTime(id: number): Promise<any>;
    updateUsername(id: number, username: string): Promise<Player>;
    updateAvatar(id: number, avatar: string): Promise<Player>;
    updateLevel(id: number, difficult: boolean): Promise<Player>;
    winsGame(id: number): Promise<Player>;
    LostGame(id: number): Promise<Player>;
    updateStatus(id: number, status: UserStatus): Promise<Player>;
    getAchievements(id: number): Promise<any>;
    findPlayer(id: number): Promise<Player>;
    findOrCreate(id: number, login: string): Promise<Player>;
    verifyToken(token: string): Promise<Player>;
    generateSecretQr(user: Player): Promise<string>;
    turnOnTwoFactorAuthentication(id: number): Promise<void>;
    generateTwoFactorAuthenticationSecret(user: Player): Promise<{
        secret: string;
        otpauth_url: string;
    }>;
    verifyTwoFactorAuthenticationCodeValid(user: Player, code: string): Promise<boolean>;
}
