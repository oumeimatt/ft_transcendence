import { Player } from "./player.entity";
import { Repository } from "typeorm";
import { GetPlayersFilterDto } from "./dto-players/get-player-filter.dto";
export declare class PlayerRepository extends Repository<Player> {
    getUsers(FilterDto: GetPlayersFilterDto): Promise<Player[]>;
}
