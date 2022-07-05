import { EntityRepository, Repository } from "typeorm";
import { Player } from "../players/player.entity";
import { CreateGameDto } from "./dto-game/create-game.dto";
import { GetGameFilterDto } from "./dto-game/get-game-filter.dto";
import { Game } from "./game.entity";
import { GameStatus } from "./game_status.enum";

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {

	async getGame(FilterDto: GetGameFilterDto): Promise<Game[]> {
		const { id, user1, winner, status } = FilterDto;
		const query = this.createQueryBuilder('game');
		if (id) {
			query.andWhere('match.id = :id', { id });
		}
		if (user1) {
			query.andWhere('match.user1 = :user1', { user1 });
		}
		if (winner) {
			query.andWhere('match.winner = :winner', { winner });
		}
		if (status) {
			query.andWhere('match.status = :status', { status });
		}
		const games = await query.getMany();
		return games;
	}

	async createGame(
		createGameDto: CreateGameDto,
		player: Player,
	): Promise<Game> {
		// const { user1 } = createGameDto;
		const game = new Game();
		// game.winner = '';
		game.status = GameStatus.GAMEOVER;
		await game.save();
		return game;
	}
}