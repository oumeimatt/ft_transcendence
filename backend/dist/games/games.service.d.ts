import { Player } from "../players/player.entity";
import { CreateGameDto } from "./dto-game/create-game.dto";
import { GetGameFilterDto } from "./dto-game/get-game-filter.dto";
import { Game } from "./game.entity";
import { GameRepository } from "./game.repository";
export declare class GameService {
    private gameRepository;
    constructor(gameRepository: GameRepository);
    createGame(createMatchDto: CreateGameDto, player: Player): Promise<Game>;
    getGameById(id: number): Promise<Game>;
    getGame(FilterDto: GetGameFilterDto): Promise<Game[]>;
    deleteGame(id: number): Promise<void>;
}
