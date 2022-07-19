import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Player } from '../utils';

export class CreateGameHistoryDto {
  @IsNotEmpty()
  @IsString()
  mode: string;

  @IsNotEmpty()
  winner: Player;

  @IsNotEmpty()
  loser: Player;

  @IsNotEmpty()
  @IsNumber()
  winnerScore: number;

  @IsNotEmpty()
  @IsNumber()
  loserScore: number;
}
