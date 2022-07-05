import { IsIn, IsNotEmpty } from "class-validator";
import { GetPlayer } from "../../players/get-player.decorator";
import { Player } from "../../players/player.entity";

export class CreateRelationDto {

	@IsNotEmpty()
	receiver: Player;
}