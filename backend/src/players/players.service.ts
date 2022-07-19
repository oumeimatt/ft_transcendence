import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { RelationRepository } from "../relations/relation.repository";
import { RelationStatus } from "../relations/relation_status.enum";
import { GetPlayersFilterDto } from "./dto-players/get-player-filter.dto";
import { Player } from "./player.entity";
import { PlayerRepository } from "./player.repository";
import { UserStatus } from "./player_status.enum";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(PlayerRepository)
		private userRepository: PlayerRepository,
		private jwtService: JwtService,
	) {}

	// async signUp(createUserDto: CreateUserDto): Promise<void> {
	// 	return this.userRepository.signUp(createUserDto);
	// }

	// async signIn(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
	// 	const username = await this.userRepository.validateUserPassword(createUserDto);
	// 	if (!username) {
	// 		throw new UnauthorizedException('Invalid credentials')
	// 	}
	
	// 	const payload: JwtPayload = { username };
	// 	const accessToken = await this.jwtService.sign(payload);
	// 	return { accessToken };
	// }

	async getUserById(id: number): Promise<Player> {
		const found = await this.userRepository.findOne(id);
		if (!found){
			throw new NotFoundException(`User with ID "${id}" not found`);
		}
		return found;
	}
	
	async getUserByUsername(username:string): Promise<Player> {
		const found = await this.userRepository.findOne(username);
		if (!found){
			throw new NotFoundException(`User with ID "${username}" not found`);
		}
		return found;
	}

	async getUsers(FilterDto: GetPlayersFilterDto):Promise<Player[]> {
		return this.userRepository.getUsers(FilterDto);
	}

	async updateUsername(id: number, username: string): Promise<Player> {

		const updated = await this.getUserById(id);
		updated.username = username;
		try {
			await updated.save();
		} catch (error) {
			console.log(error.code);
			if (error.code === '23505') {
				throw new ConflictException('Username already exists');
			} else {
				throw new InternalServerErrorException();
			}
		}
		return updated;
	}

	async updateAvatar(id: number, avatar: string): Promise<Player> {

		const updated = await this.getUserById(id);
		updated.avatar = avatar;
		await updated.save();
		return updated;
	}

	async updateTwoFa(id: number): Promise<Player> {
		const updated = await this.getUserById(id);
		updated.two_fa = true;
		//& enable 2fa
		await updated.save();
		return updated;
	}

	async updateLevel(id: number): Promise<Player> {
		const updated = await this.getUserById(id);
		updated.level += 0.125;
		await updated.save();
		return updated;
	}

	async updateStatus(id: number, status: UserStatus): Promise<Player> {
		const updated = await this.getUserById(id);
		updated.status = status;
		await updated.save();
		return updated;
	}

	async getAchievements(id: number): Promise<any> {
		const achievements = ['gold', 'silver', 'bronze', 'first'];
		const user = await this.userRepository.findOne(id);
		let s: number = 0;
		if (user.wins >= 20)
			s = -4;
		else if (user.wins >= 10)
			s = -3;
		else if (user.wins >= 5)
			s = -2;
		else if (user.wins == 1)
			s = -1;
		else
			s = 4;
		return achievements.slice(s);
	}

	async findOrCreate(id: number, login: string): Promise<Player> {
		console.log("find or create > number of arguments passed: ", arguments.length);
		console.log(id, login);
		const found = await this.userRepository.findOne({ where: { id } });
		if (found) {
			console.log('found !!');
			found.status = UserStatus.ONLINE;
			await found.save();
			return found;
		}
		console.log('not found !!');
		const newUser = new Player();
		newUser.id = id;
		newUser.username = login;
		newUser.avatar = "https://avatars.dicebear.com/api/croodles/" + login + ".svg";
		newUser.level = 0.0;
		newUser.wins = 0;
		newUser.losses = 0;
		newUser.status = UserStatus.ONLINE;
		newUser.two_fa = false;
		await newUser.save();
		console.log('new User saved successfully ' + newUser);
		if (typeof(newUser) == 'undefined') {
			console.log('newUser is undefined');
		}
		return newUser;
	}

	async verifyToken(token: string): Promise<Player> {

		try {
			const decoded = await this.jwtService.verify(token.toString());
			if (typeof decoded === 'object' && 'id' in decoded)
				return decoded;
			throw new BadRequestException();
		} catch(error) {
			throw new BadRequestException('Token expired');
		}
	}
}
