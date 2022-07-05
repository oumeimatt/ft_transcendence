import { Player } from "../players/player.entity";
import { CreateGameDto } from "./dto-game/create-game.dto";
import { GetGameFilterDto } from "./dto-game/get-game-filter.dto";
import { Game } from "./game.entity";
import { GameService } from "./games.service";
export declare class GameController {
    private readonly gameService;
    constructor(gameService: GameService);
    getGames(FilterDto: GetGameFilterDto): Promise<Game[]>;
    getGameById(id: number): Promise<Game>;
    addGame(createGameDto: CreateGameDto, player: Player): Promise<Game>;
    deleteGame(id: number): Promise<void>;
}
