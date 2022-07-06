import { AuthService } from './auth.service';
import { UsersService } from 'src/players/players.service';
import { Request } from "express";
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    FortyTwoAuth(req: Request, res: Response): Promise<void | "no user from 42">;
    logout(req: Request, res: Response): Promise<any>;
}
