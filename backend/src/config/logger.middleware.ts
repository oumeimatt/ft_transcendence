import { NestMiddleware} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../players/players.service";
import { UserStatus } from "../players/player_status.enum";
// import { Player } from "../players/player.entity";

export class LoggerMiddleware implements NestMiddleware {
	constructor(
		private readonly usersService: UsersService,
	) {}
  async use(req: Request, res: Response, next: NextFunction) {
	//console.log("middleware **** ");
	//console.log(req.body);
	// console.log(`${req.method} ${req.url}`);
	// console.log(req.cookies.connect_sid);
	// const user = await this.usersService.verifyToken(req.cookies.connect_sid);
	// for (const [i, j] of Object.entries(user)) {
	// 	console.log(i, j);
	// }
	// const player = await this.usersService.getUserByStatusId(user.id);
	// if (player) {
	// 	await this.usersService.updateStatus(user.id, UserStatus.ONLINE);
	// 	console.log(`${player.username} is offline`);
	// }
	next();
  }
}