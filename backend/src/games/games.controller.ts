import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { GetPlayer } from "../players/get-player.decorator";
import { Player } from "../players/player.entity";
import { CreateGameDto } from "./dto-game/create-game.dto";
import { GetGameFilterDto } from "./dto-game/get-game-filter.dto";
import { Game } from "./game.entity";
import { GameService } from "./games.service";

@Controller('play')
export class GameController {
	constructor(private readonly gameService: GameService){}

	@Get()
	getGames(@Query(ValidationPipe) FilterDto: GetGameFilterDto) {
		return this.gameService.getGame(FilterDto);
	}

	@Get('/:id')
	getGameById(@Param('id', ParseIntPipe) id: number): Promise<Game> {
		return this.gameService.getGameById(id);
	}

	@Post()
	@UsePipes(ValidationPipe)
	addGame(
		@Body() createGameDto: CreateGameDto,
		@GetPlayer() player: Player,
	): Promise<Game> {
		return this.gameService.createGame(createGameDto, player);
	}

	@Delete('/:id')
	deleteGame(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.gameService.deleteGame(id);
	}

}
