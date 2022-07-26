import { Controller, Get, UseGuards, Req, Res, Response, UseInterceptors, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from "express";
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../players/players.service';
import { AuthExceptionFilter } from './auth-exception.filter';

@Controller('/auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService,
	) {}

	@Get('/login')
	@UseFilters(new AuthExceptionFilter())
	@UseGuards(AuthGuard('42'))
	async FortyTwoAuth(
		@Req() req: Request,
		@Response() res,
	): Promise<any> {
		this.authService.login(req, res);
	}

	@Get('/logout')
    async logout(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<any> {
        const user = await this.usersService.verifyToken(req.cookies.connect_sid);
        return this.authService.logout(user.id, req, res);
    }

}
