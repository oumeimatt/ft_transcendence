import { Controller, Get, UseGuards, Req, Res, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from "express";
import { AuthGuard } from '@nestjs/passport';
import { GetPlayer } from '../players/get-player.decorator';
import { Player } from '../players/player.entity';
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
		console.log("HERE");
		return this.authService.login(req, res);
	}

	// @Get('/callback')
	// @UseGuards(AuthGuard('42'))
	// async FortyTwoAuthRedirect(@Req() req: Request, @Res() res: Response) {
	// 	return this.authService.cb(req, res);
	// }

	@Get('/logout')
    async logout(
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<any> {
        const user = await this.usersService.verifyToken(req.cookies.connect_sid);
        return this.authService.logout(user.id, req, res);
    }
}
