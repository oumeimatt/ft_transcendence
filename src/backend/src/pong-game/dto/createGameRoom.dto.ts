import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { GameMood } from '../interfaces';

export class CreateGameRoomDto {
  @IsNotEmpty()
  roomname: string;

  @IsNotEmpty()
  @IsIn([ GameMood.DEFAULT, GameMood.DIFFICULT, GameMood.ONEVONE ])
  difficulty: GameMood ;

  @IsNotEmpty()
  @IsString()
  player1: string;

  @IsNotEmpty()
  @IsString()
  player2: string;
}
