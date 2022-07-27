import { IsNotEmpty } from "class-validator";
import { Player } from "../../players/player.entity";

export class CreateRelationDto {

	@IsNotEmpty()
	receiver: Player;
}