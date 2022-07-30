import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Player } from '../../players/player.entity';
import { GameMood } from '../interfaces';

export class CreateGameHistoryDto {
  @IsNotEmpty()
  @IsIn([ GameMood.DEFAULT, GameMood.DIFFICULT, GameMood.ONEVONE ])
  mode: GameMood;

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
