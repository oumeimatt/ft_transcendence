import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Player } from "../../players/player.entity";
import { GameStatus } from "../game_status.enum";

export class GetGameFilterDto {

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsOptional()
    @IsNotEmpty()
    user1: number;

    @IsOptional()
    @IsNotEmpty()
    winner: number;

    @IsOptional()
    @IsIn([GameStatus.GAMEOVER, GameStatus.PLAYING])
    status: GameStatus;

}