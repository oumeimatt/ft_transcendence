import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGameHistoryDto {
  @IsNotEmpty()
  @IsString()
  difficulty: string;

  @IsNotEmpty()
  @IsString()
  winner: string;

  @IsNotEmpty()
  @IsString()
  loser: string;

  @IsNotEmpty()
  @IsNumber()
  winnerScore: number;

  @IsNotEmpty()
  @IsNumber()
  loserScore: number;
}
