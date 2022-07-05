import { Controller, Post, Get, Body, Param, Patch, ParseIntPipe, Query, ValidationPipe, UseGuards, Req, Header } from "@nestjs/common";
import { Player } from "./player.entity";
import { UsersService } from "./players.service";
import { GetPlayersFilterDto } from "./dto-players/get-player-filter.dto";
import { RelationsService } from "../relations/relations.service";
import { GetPlayer } from "./get-player.decorator";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConnectableObservable } from "rxjs";
import { JwtStrategy } from "../auth/jwt.strategy";
import { FileInterceptor } from "@nestjs/platform-express";
// import { JwtAuthGuard } from "../auth/jwt-auth.guard";
// import { request, Request } from "express";
// import { GetPlayer } from "./get-player.decorator";

@Controller()
// @UseGuards(JwtAuthGuard)
// @UseGuards(AuthGuard())
export class UsersController {
	constructor(
		// @Inject(forwardRef( () => RelationsService))
		private readonly usersService: UsersService,
		private readonly relationService: RelationsService,
		private jwtService: JwtService,
		// private readonly gameService: GameService,
	){}

	// @Post('/signup')
	// signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
	// 	return this.usersService.signUp(createUserDto);
	// }

	// @Post('/signin')
	// signIn(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<{ accessToken: string }>{
	// 	return this.usersService.signIn(createUserDto);
	// }

	// @Get('profile/:id')
	// getProfile(@Param('id', ParseIntPipe) id: number): Promise<any> {
	// 	// return this.usersService.getUserById(id);
	// }

	// @Get()
	// @Redirect('https://api.intra.42.fr/oauth/authorize?client_id=586c1c8fde913cc2d625042e39cd449c79a3c386dce871f6e55caa110796bc56&redirect_uri=http%3A%2F%2F127.0.0.1%3A3001%2Fauth%2Flogin&response_type=code', 301)
	// test() {}

	//- get logged user profile
	@Get('/profile')
	@Header('Access-Control-Allow-Origin', 'http://localhost:3000')
    @Header('Access-Control-Allow-Credentials', 'true')
	async getProfile(
		@Req() req: Request,
	) {
		console.log(req.cookies);
		// const userId = await this.jwtService.verify(req.cookies.connect_sid);

		const user = await this.usersService.verifyToken(req.cookies.connect_sid);
		const playerData = await this.usersService.getUserById(user.id);
		// const friends = await this.relationService.getRelationByUser(id, RelationStatus.FRIEND);
		const achievements = await this.usersService.getAchievements(user.id);
		// const matchHistory = await this.gameService.getMatchByUser(id);
		const data = {
			"profile": playerData,
			// "friends": friends,
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
		@Param('id', ParseIntPipe) id: number,
	){
		const playerData = await this.usersService.getUserById(id);
		// const friends = await this.relationService.getRelationByUser(id, RelationStatus.FRIEND); //+ loop over relations array, get friends id
		const achievements = await this.usersService.getAchievements(id);
		// const matchHistory = await this.gameService.getMatchByUser(id);
		const data = {
			"profile": playerData,
			// "friends": friends,
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
	async updateAvatar(
		@Req() req: Request,
		@Body('avatar') avatar: string,

	){
		// console.log(file);
		const user = await this.usersService.verifyToken(req.cookies.connect_sid);
		return this.usersService.updateAvatar(user.id, avatar);
	}

	//- enaable two factor authentication
	@Patch('/settings/2fa')
	@Header('Access-Control-Allow-Origin', 'http://localhost:3000')
    @Header('Access-Control-Allow-Credentials', 'true')
	async updateTwoFa(
		@Req() req: Request,
	){
		const user = await this.usersService.verifyToken(req.cookies.connect_sid);
		return this.usersService.updateTwoFa(user.id);
	}

	// get all users - remove later...
	@Get('/users')
	@Header('Access-Control-Allow-Origin', 'http://localhost:3000')
    @Header('Access-Control-Allow-Credentials', 'true')
	getUsers(@Query(ValidationPipe) FilterDto: GetPlayersFilterDto) {
		return this.usersService.getUsers(FilterDto);
	}
}