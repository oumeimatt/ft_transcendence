import { Injectable, Request, Response } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { JwtPayload } from "./jwt-payload.interface";
import { Player } from '../players/player.entity';
import { UsersService } from '../players/players.service';
import { UserStatus } from '../players/player_status.enum';
import * as dotenv from "dotenv";
import { JwtPayload } from './jwt-payload.interface';
dotenv.config({ path: `.env` })

const passport = require('passport');
const FortyTwoStrategy = require('passport-42').Strategy;

passport.use(new FortyTwoStrategy({

	clientID: process.env.UID,
	clientSecret: process.env.SECRET,
	callbackURL: process.env.CALLBACK_URL,
	},
	async function(accessToken: string, refreshToken: string, profile: any, cb: any) {
		// console.log(profile);
		const user = {
			id: profile._json.id,
			login: profile._json.login,
			accessToken: accessToken,
			refreshToken: refreshToken,
		}
		cb(null, user);
	}
));

@Injectable()
export class AuthService {
	constructor(
		private readonly playerService: UsersService,
		private jwtService: JwtService,
	) {}

	async login(@Request() req, @Response() res) {
		console.log('login');
		passport.authenticate('42');
		if (!req.user) {
			return 'no user from 42';
		}
		const user = req.user;
		const player = await this.playerService.findOrCreate(user.id, user.login);
		// console.log(player);
		// for (const [i, j] of Object.entries(player)) {
		// 	console.log(i, j);
		// }
		return this.cb(req, res, player);
	}

	async cb(@Request() req, @Response() res, player: Player) {
		console.log("called");
		passport.authenticate('42', {failureRedirect: `/auth/login`});
		const id = player.id;
		const username = player.username;
		const payload: JwtPayload = { username, id };
		const accessToken = await this.jwtService.sign(payload);
		res.cookie('connect_sid',[accessToken]);
		res.redirect('http://localhost:3000/home');
		// return player;
	}

	async logout(id: number, req, res): Promise<any> {
		console.log('logout');
		await this.playerService.updateStatus(id, UserStatus.OFFLINE);
		// passport.logout();
		req.logout();
		return res.redirect('/auth/login');
	}
}
