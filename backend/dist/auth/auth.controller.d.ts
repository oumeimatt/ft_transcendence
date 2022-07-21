import { AuthService } from './auth.service';
import { Request } from "express";
import { UsersService } from '../players/players.service';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    FortyTwoAuth(req: Request, res: Response): Promise<any>;
    logout(req: Request, res: Response): Promise<any>;
}
