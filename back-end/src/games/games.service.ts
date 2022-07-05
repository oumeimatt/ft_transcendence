import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Player } from "../players/player.entity";
import { PlayerRepository } from "../players/Player.repository";
import { CreateGameDto } from "./dto-game/create-game.dto";
import { GetGameFilterDto } from "./dto-game/get-game-filter.dto";
import { Game } from "./game.entity";
import { GameRepository } from "./game.repository";

@Injectable()
export class GameService {
    constructor(
        @InjectRepository(PlayerRepository)
        private gameRepository: GameRepository,
    ) {}

    async createGame(
		createMatchDto: CreateGameDto,
		player: Player,
	): Promise<Game> {
        return this.gameRepository.createGame(createMatchDto, player);
    }

    async getGameById(id: number): Promise<Game> {
		const found = await this.gameRepository.findOne(id);
		if (!found){
			throw new NotFoundException(`Match with ID "${id}" not found`)
		}
		return found;
	}

	async getGame(FilterDto: GetGameFilterDto):Promise<Game[]> { 
		return this.gameRepository.getGame(FilterDto);
	}

    async deleteGame(id: number): Promise<void> {
		const del = await this.gameRepository.delete(id);
		if (!del.affected){
			throw new NotFoundException(`Match with ID "${id}" not found`)
		}
	}
}