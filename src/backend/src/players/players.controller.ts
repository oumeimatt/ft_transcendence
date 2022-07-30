import { Controller, Get, Body, Param, Patch, ParseIntPipe, Query, ValidationPipe, Req, UseInterceptors, UploadedFile, Post, Response, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "./players.service";
import { GetPlayersFilterDto } from "./dto-players/get-player-filter.dto";
import { RelationsService } from "../relations/relations.service";
import { JwtService } from "@nestjs/jwt";
import { Request, Express } from "express";
import * as fs  from "fs";
import { FileInterceptor } from "@nestjs/platform-express";
import { RelationStatus } from "../relations/relation_status.enum";
import { JwtPayload } from "../auth/jwt-payload.interface";
import { UserStatus } from "./player_status.enum";

@Controller()
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly relationService: RelationsService,
		private jwtService: JwtService,
	){}

	@Get('/twoFaUser')
	async playerAuth(
		@Req() req: Request,
	) {
		// console.log('twofa Auth check -> verify');
		const user = await this.usersService.verifyToken(req.cookies.twofa);
		const playerData = await this.usersService.getUserById(user.id);
		return { "profile": playerData };
	}

	//- get logged user profile
	@Get('/profile')
	async getProfile(
		@Req() req: Request,
	) {
		// console.log('getProfile - controller');
		const user = await this.usersService.verifyToken(req.cookies.connect_sid);
		const playerData = await this.usersService.getUserById(user.id);
		// for (const [i, j] of Object.entries(user)) {
		// 	console.log(i, j);
		// }
		const friends = await this.relationService.getUsersByStatus(user, RelationStatus.FRIEND);
		const blockedUsers = await this.relationService.getUsersByStatus(user, RelationStatus.BLOCKED);
		const achievements = await this.usersService.getAchievements(user.id);
		const data = {
			"profile": playerData,
			"wins": playerData.wins,
			"losses": playerData.losses,
			"friends": friends,
			"blockedUsers": blockedUsers,
			"achievements": achievements,
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
		// console.log('users profile -> verify');
		const user_token = await this.usersService.verifyToken(req.cookies.connect_sid);
		const playerData = await this.usersService.getUserById(id);
		const friends = await this.relationService.getUsersByStatus(playerData, RelationStatus.FRIEND);
		// const user = await this.usersService.getUserById(user_token.id);
		const blockedUsers = await this.relationService.getUsersByStatus(playerData, RelationStatus.BLOCKED);
		const achievements = await this.usersService.getAchievements(id);
		const data = {
			"profile": playerData,
			"friends": friends,
			"blockedUsers": blockedUsers,
			"achievements": achievements,
		};
		return data;
	}

	@Get('/first_time')
	async firstTime(
		@Req() req: Request
	){
		const user_token = await this.usersService.verifyToken(req.cookies.connect_sid);
		await this.usersService.firstTime(user_token.id);
	}

	//- update username
	@Patch('/settings/username')
	async updateUsername(
		@Req() req: Request,
		@Body('username') username: string,
	){
		// console.log('update username -> verify');
		const user = await this.usersService.verifyToken(req.cookies.connect_sid);
		return await this.usersService.updateUsername(user.id, username);
	}

	//- update avatar
	@Post('/settings/avatar/:imageName')
    @UseInterceptors(FileInterceptor('avatar'))
    async updateAvatar(
        @Req() req: Request,
		@Param('imageName') imageName : string,
		@UploadedFile() avatar: Express.Multer.File,
    ){
		// console.log('update avatar -> verify');
        const user = await this.usersService.verifyToken(req.cookies.connect_sid);
        fs.writeFileSync(process.cwd() + "/public/" + imageName, avatar.buffer);
		return await this.usersService.updateAvatar(user.id, imageName);
    }

	//- enable two factor authentication
	@Get('/settings/2fa/generate')
	async updateTwoFa(
		@Req() req: Request,
	): Promise<string>{
		// console.log('generate 2fa -> verify');
		const user = await this.usersService.verifyToken(req.cookies.connect_sid);
		const imageUrl = await this.usersService.generateSecretQr(user);
		// console.log("imageUrl === ", imageUrl);
		return imageUrl;
	}

	@Post('/settings/2fa/enable')
	async twoFactorEnable(
		@Req() req: Request,
		@Body('Password2fa') Password2fa: string,
	): Promise<void> {
		// console.log('enable 2fa -> verify');
        const user_token = await this.usersService.verifyToken(req.cookies.connect_sid);
		const user = await this.usersService.getUserById(user_token.id);
		const isValid = await this.usersService.verifyTwoFactorAuthenticationCodeValid(user, Password2fa);
		if (!isValid) {
			console.log('invalid');
			throw new UnauthorizedException('Wrong authentication code');
		}
		console.log('valid');
		fs.unlinkSync(process.cwd() + "/public/qr_" + user.id + ".png");
		await this.usersService.turnOnTwoFactorAuthentication(user.id);
		console.log('two factor authentication enabled' + user.two_fa);
	}

	@Post('/twofactorauthentication')
	async twoFactorAuthenticate(
		@Req() req: Request,
		@Response() res,
		@Body('twoFactorCode') code: string,
	): Promise<any> {
		// console.log('2fa auth -> verify');
		const player = await this.usersService.verifyToken(req.cookies.twofa);
		const user = await this.usersService.getUserById(player.id);
		const isValid = await this.usersService.verifyTwoFactorAuthenticationCodeValid(user, code);
		if (!isValid) {
			await this.usersService.updateStatus(user.id, UserStatus.OFFLINE);
			throw new UnauthorizedException('Wrong authentication code');
		}
		await res.clearCookie('twofa', {domain: process.env.FRONTEND_HOST , path: '/'});
		const id = user.id;
		const username = user.username;
		const two_fa = user.two_fa;
		const payload: JwtPayload = { username, id, two_fa };
		const accessToken = await this.jwtService.sign(payload);
		await this.usersService.updateStatus(user.id, UserStatus.ONLINE);
		res.cookie('connect_sid',[accessToken]);
		res.send(accessToken);
	}

	// //!!!!! to be replaced by socket solution
	// //+ upadte user status online/offline
	// @Get('/updateUsersStatus')
	// async updateUsersStatus(): Promise<any> {
		// return await this.usersService.updateUsersStatus();
	// }

	//- get all users
	@Get('/users')
	async getUsers(
		@Query(ValidationPipe) FilterDto: GetPlayersFilterDto,
		@Req() req: Request,
	) {
		// console.log('get all users -> verify');
		const user = await this.usersService.verifyToken(req.cookies.connect_sid);
		return this.usersService.getUsers(FilterDto);
	}
}