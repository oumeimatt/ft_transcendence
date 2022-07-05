import { AuthService } from './auth.service';
import { Player } from '../players/player.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    FortyTwoAuth(req: Request, res: Response): Promise<void | "no user from 42">;
    logout(player: Player, req: Request, res: Response): any;
}
