import { Controller, Get, UseGuards, Req, Res, Response, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from "express";
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../players/players.service';

@Controller('/auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService,
	) {}

	@Get('/login')
	@UseGuards(AuthGuard('42'))
	async FortyTwoAuth(
		@Req() req: Request,
		@Res() res: Response
	): Promise<any> {
		return this.authService.login(req, res);
	}

	@Get('/logout')
    async logout(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<any> {
        const user = await this.usersService.verifyToken(req.cookies.connect_sid);
        return this.authService.logout(user.id, req, res);
    }

	// @Post('/2fa')
	// async TwoFactorAuth(
	// 	@Req() req: Request,
	// 	@Body('twaFactorCode') code: string,
	// ): Promise<any> {
    //     const user = await this.usersService.verifyToken(req.cookies.connect_sid);
	// 	const isValid = await this.usersService.verifyTwoFactorAuthenticationCodeValid(user, code);
	// 	if (!isValid) {
	// 		throw new UnauthorizedException('Wrong authentication code');
	// 	}
	// }
}
