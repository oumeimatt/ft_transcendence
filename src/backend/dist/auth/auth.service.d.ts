import { JwtService } from '@nestjs/jwt';
import { Player } from '../players/player.entity';
import { UsersService } from '../players/players.service';
export declare class AuthService {
    private readonly playerService;
    private jwtService;
    constructor(playerService: UsersService, jwtService: JwtService);
    login(req: any, res: any): Promise<void>;
    cb(res: any, player: Player): Promise<void>;
    logout(id: number, res: any): Promise<any>;
}
