import { Controller, Get, UseGuards, Req, Res, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthGuard } from '@nestjs/passport';
import { GetPlayer } from '../players/get-player.decorator';
import { Player } from '../players/player.entity';

@Controller('/auth')
export class AuthController {
	constructor(private readonly authService: AuthService){}

	@Get('/login')
	@UseGuards(AuthGuard('42'))
	async FortyTwoAuth(@Request() req: Request, @Response() res: Response) {
		console.log("HERE");
		return this.authService.login(req, res);
	}

	// @Get('/callback')
	// @UseGuards(AuthGuard('42'))
	// async FortyTwoAuthRedirect(@Req() req: Request, @Res() res: Response) {
	// 	return this.authService.cb(req, res);
	// }

	@Get('/logout')
	@UseGuards(AuthGuard('42'))
	logout(
		@GetPlayer() player: Player,
		@Request() req: Request, @Response() res: Response,
	): any{
		return this.authService.logout(player.id, req, res);
	}
}
