import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateGameRoomDto {
  @IsNotEmpty()
  roomname: string;

  @IsNotEmpty()
  @IsIn(['difficult', 'default'])
  difficulty: string;

  @IsNotEmpty()
  @IsString()
  player1: string;

  @IsNotEmpty()
  @IsString()
  player2: string;
}
