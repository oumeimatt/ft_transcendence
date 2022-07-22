import { JwtService } from '@nestjs/jwt';
import { Player } from '../players/player.entity';
import { UsersService } from '../players/players.service';
export declare class AuthService {
    private readonly playerService;
    private jwtService;
    constructor(playerService: UsersService, jwtService: JwtService);
    login(req: any, res: any): Promise<void | "no user from 42">;
<<<<<<< HEAD
    cb(req: any, res: any, player: Player): Promise<void>;
=======
    cb(res: any, player: Player): Promise<void>;
>>>>>>> ca64583a49be4640eacba5eaf6dfc5e49605b64d
    logout(id: number, req: any, res: any): Promise<any>;
}
