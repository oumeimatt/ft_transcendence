import { IsIn, IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  roomname: string;

  @IsNotEmpty()
  @IsIn(['difficult', 'default'])
  difficulty: string;
}
