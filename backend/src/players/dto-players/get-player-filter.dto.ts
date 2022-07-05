import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { UserStatus } from "../player_status.enum";

export class GetPlayersFilterDto {
    
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsOptional()
    @IsString()
    username: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    level: number;

    @IsOptional()
    @IsIn([UserStatus.OFFLINE, UserStatus.ONLINE, UserStatus.PLAYING])
    status: UserStatus;
}