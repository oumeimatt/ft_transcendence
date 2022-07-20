import { Controller, Get, Body, Param, Patch, ParseIntPipe, Query, ValidationPipe, Req, Header, UseInterceptors, UploadedFile, Post } from "@nestjs/common";
import { UsersService } from "./players.service";
import { GetPlayersFilterDto } from "./dto-players/get-player-filter.dto";
import { RelationsService } from "../relations/relations.service";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";
import { Request, Express } from "express";
import * as fs  from "fs";
import { FileInterceptor } from "@nestjs/platform-express";
import { RelationStatus } from "../relations/relation_status.enum";

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
	async getProfile(
		@Req() req: Request,
	) {
		const user = await this.usersService.verifyToken(req.cookies.connect_sid);
		const playerData = await this.usersService.getUserById(user.id);
		const friends = await this.relationService.getUsersByStatus(user, RelationStatus.FRIEND);
		const blockedUsers = await this.relationService.getUsersByStatus(user, RelationStatus.BLOCKED);
		const achievements = await this.usersService.getAchievements(user.id);
		// const matchHistory = await this.gameService.getMatchByUser(id);
		const data = {
			"profile": playerData,
			"wins": playerData.wins,
			"losses": playerData.losses,
			"friends": friends,
			"blockedUsers": blockedUsers,
			"achievements": achievements,
			// "matchHistory": matchHistory,
			"cookie":req.cookies.connect_sid,
		};
		return data;
	}

	//- get friend profile
	@Get('/profile/:id')
	async getFriendProfile(
		@Req() req: Request,
		@Param('id', ParseIntPipe) id: number,
	){
		const user = await this.usersService.verifyToken(req.cookies.connect_sid);
		const playerData = await this.usersService.getUserById(id);
		const friends = await this.relationService.getUsersByStatus(playerData, RelationStatus.FRIEND);
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
	async updateUsername(
		@Req() req: Request,
		@Body('username') username: string,
	){
		const user = await this.usersService.verifyToken(req.cookies.connect_sid);
		return this.usersService.updateUsername(user.id, username);
	}

	//- update avatar
	@Post('/settings/avatar/:imageName')
    @UseInterceptors(FileInterceptor('avatar'))
    async updateAvatar(
        @Req() req: Request, @Param('imageName') imageName : string, @UploadedFile() avatar: Express.Multer.File
        // @Body('avatar') avatar: string,
        // @UploadedFile() avatar: Express.Multer.File
    ){
        const user = await this.usersService.verifyToken(req.cookies.connect_sid);
        fs.writeFileSync(process.cwd().substring(0,process.cwd().length - 7) + "frontend/public/assets/"+imageName, avatar.buffer);
        console.log("imagename === ", imageName)
		return this.usersService.updateAvatar(user.id, imageName);
    }

	//- enable two factor authentication
	@Patch('/settings/2fa')
	async updateTwoFa(
		@Req() req: Request,
	){
		const user = await this.usersService.verifyToken(req.cookies.connect_sid);
		return this.usersService.updateTwoFa(user.id);
	}

	//- get all users
	@Get('/users')
	async getUsers(
		@Query(ValidationPipe) FilterDto: GetPlayersFilterDto,
		@Req() req: Request,
	) {
		const user = await this.usersService.verifyToken(req.cookies.connect_sid);
		return this.usersService.getUsers(FilterDto);
	}
}