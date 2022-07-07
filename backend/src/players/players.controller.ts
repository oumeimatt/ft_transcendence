import { Controller, Get, Body, Param, Patch, ParseIntPipe, Query, ValidationPipe, UseGuards, Req, Header, UseInterceptors, UploadedFile } from "@nestjs/common";
import { UsersService } from "./players.service";
import { GetPlayersFilterDto } from "./dto-players/get-player-filter.dto";
import { RelationsService } from "../relations/relations.service";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";
import { Request, Express } from "express";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller()
export class UsersController {
	constructor(
		// @Inject(forwardRef( () => RelationsService))
		private readonly usersService: UsersService,
		private readonly relationService: RelationsService,
		private jwtService: JwtService,
		// private readonly gameService: GameService,
	){}

	//- get logged user profile
	@Get('/profile')
	@Header('Access-Control-Allow-Origin', 'http://localhost:3000')
	@Header('Access-Control-Allow-Credentials', 'true')
	async getProfile(
		@Req() req: Request,
	) {
		const user = await this.usersService.verifyToken(req.cookies.connect_sid);
		const playerData = await this.usersService.getUserById(user.id);
		// const friends = await this.usersService.getAllFriends(user);
		const friends = await this.relationService.getAllFriends(user);
//& select player.usernmame and relation.receiver from player left join relation where relation.sender.id = user.id
		const achievements = await this.usersService.getAchievements(user.id);
		// const matchHistory = await this.gameService.getMatchByUser(id);
		const data = {
			"profile": playerData,
			"friends": friends,
			"achievements": achievements,
			// "matchHistory": matchHistory,
		};
		return data;
	}

	//- get friend profile
	@Get('/profile/:id')
	@Header('Access-Control-Allow-Origin', 'http://localhost:3000')
	@Header('Access-Control-Allow-Credentials', 'true')
	async getFriendProfile(
		@Req() req: Request,
		@Param('id', ParseIntPipe) id: number,
	){
		// console.log('here');
		const user = await this.usersService.verifyToken(req.cookies.connect_sid);

		const playerData = await this.usersService.getUserById(id);
		// const friends = await this.usersService.getAllFriends(playerData);
		const friends = await this.relationService.getAllFriends(playerData);
		const achievements = await this.usersService.getAchievements(id);
		// const matchHistory = await this.gameService.getMatchByUser(id);
		const data = {
			"profile": playerData,
			"friends": friends,
			"achievements": achievements,
			// "matchHistory": matchHistory,
		};
		return data;
	}

	//- update username
	@Patch('/settings/username')
	@Header('Access-Control-Allow-Origin', 'http://localhost:3000')
	@Header('Access-Control-Allow-Credentials', 'true')
	async updateUsername(
		@Req() req: Request,
		@Body('username') username: string,
	){
		const user = await this.usersService.verifyToken(req.cookies.connect_sid);
		return this.usersService.updateUsername(user.id, username);
	}

	//- update avatar
	@Patch('/settings/avatar')
	@Header('Access-Control-Allow-Origin', 'http://localhost:3000')
	@Header('Access-Control-Allow-Credentials', 'true')
	@UseInterceptors(FileInterceptor('avatar'))
	async updateAvatar(
		@Req() req: Request,
		// @Body('avatar') avatar: string,
		@UploadedFile() avatar: Express.Multer.File
	){
		const user = await this.usersService.verifyToken(req.cookies.connect_sid);
		console.log(avatar);
		// return this.usersService.updateAvatar(user.id, avatar);
	}

	//- enable two factor authentication
	@Patch('/settings/2fa')
	@Header('Access-Control-Allow-Origin', 'http://localhost:3000')
	@Header('Access-Control-Allow-Credentials', 'true')
	async updateTwoFa(
		@Req() req: Request,
	){
		const user = await this.usersService.verifyToken(req.cookies.connect_sid);
		return this.usersService.updateTwoFa(user.id);
	}

	//- get all users
	@Get('/users')
	@Header('Access-Control-Allow-Origin', 'http://localhost:3000')
	@Header('Access-Control-Allow-Credentials', 'true')
	async getUsers(
		@Query(ValidationPipe) FilterDto: GetPlayersFilterDto,
		@Req() req: Request,
	) {
		const user = await this.usersService.verifyToken(req.cookies.connect_sid);
		return this.usersService.getUsers(FilterDto);
	}
}