import { Repository } from "typeorm";
import { Player } from "../players/player.entity";
import { CreateGameDto } from "./dto-game/create-game.dto";
import { GetGameFilterDto } from "./dto-game/get-game-filter.dto";
import { Game } from "./game.entity";
export declare class GameRepository extends Repository<Game> {
    getGame(FilterDto: GetGameFilterDto): Promise<Game[]>;
    createGame(createGameDto: CreateGameDto, player: Player): Promise<Game>;
}
