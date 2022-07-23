import { Controller, Get, Body, Param, Patch, ParseIntPipe, Query, ValidationPipe, Req, Header, UseInterceptors, UploadedFile, Post, Res, Response, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "./players.service";
import { GetPlayersFilterDto } from "./dto-players/get-player-filter.dto";
import { RelationsService } from "../relations/relations.service";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";
import { Request, Express } from "express";
import * as fs  from "fs";
import { FileInterceptor } from "@nestjs/platform-express";
import { RelationStatus } from "../relations/relation_status.enum";
import { JwtPayload } from "../auth/jwt-payload.interface";

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
		// for (const [i, j] of Object.entries(user)) {
		// 	console.log(i, j);
		// }
		const playerData = await this.usersService.getUserById(user.id);
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
		const user = await this.usersService.verifyToken(req.cookies.connect_sid);
		const playerData = await this.usersService.getUserById(id);
		const friends = await this.relationService.getUsersByStatus(playerData, RelationStatus.FRIEND);
		const achievements = await this.usersService.getAchievements(id);
		const data = {
			"profile": playerData,
			"friends": friends,
			"achievements": achievements,
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
        @Req() req: Request,
		@Param('imageName') imageName : string,
		@UploadedFile() avatar: Express.Multer.File,
    ){
        const user = await this.usersService.verifyToken(req.cookies.connect_sid);
        fs.writeFileSync(process.cwd().substring(0,process.cwd().length - 7) + "frontend/public/assets/"+imageName, avatar.buffer);
        // console.log("imagename === ", imageName)
		return this.usersService.updateAvatar(user.id, imageName);
    }

	//- enable two factor authentication
	@Get('/settings/2fa/generate')
	async updateTwoFa(
		@Req() req: Request,
	): Promise<string>{
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
        const user_token = await this.usersService.verifyToken(req.cookies.connect_sid);
		const user = await this.usersService.getUserById(user_token.id);
		const isValid = await this.usersService.verifyTwoFactorAuthenticationCodeValid(user, Password2fa);
		if (!isValid) {
			console.log('invalid');
			throw new UnauthorizedException('Wrong authentication code');
		}
		console.log('valid');
		fs.unlinkSync(process.cwd() + "/public/qr_" + user.username + ".png");
		await this.usersService.turnOnTwoFactorAuthentication(user.id);
	}

	@Post('/twofactorauthentication')
	async twoFactorAuthenticate(
		@Req() req: Request,
		@Response() res,
		@Body('twoFactorCode') code: string,
	): Promise<any> {
        const user = await this.usersService.verifyToken(req.cookies.connect_sid);
		const isValid = await this.usersService.verifyTwoFactorAuthenticationCodeValid(user, code);
		if (!isValid) {
			throw new UnauthorizedException('Wrong authentication code');
		}
		await res.clearCookie('twofa', {domain: 'localhost', path: '/'});
		const id = user.id;
		const username = user.username;
		const two_fa = user.two_fa;
		const payload: JwtPayload = { username, id, two_fa };
		const accessToken = await this.jwtService.sign(payload);
		res.cookie('connect_sid',[accessToken]);
		res.redirect('http://localhost:3000/home');
	}

	//+ upadte user status online/offline
	@Get('/updateUsersStatus')
	async updateUsersStatus(): Promise<any> {
		console.log("updateUsersStatus ----------");
		return await this.usersService.updateUsersStatus();
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