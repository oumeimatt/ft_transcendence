import { Player } from "./player.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto-players/create-player.dto";
import { GetPlayersFilterDto } from "./dto-players/get-player-filter.dto";
export declare class PlayerRepository extends Repository<Player> {
    getUsers(FilterDto: GetPlayersFilterDto): Promise<Player[]>;
    signUp(createUserDto: CreateUserDto): Promise<void>;
}
