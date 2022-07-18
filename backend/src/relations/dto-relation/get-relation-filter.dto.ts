import { IsIn, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { GetPlayer } from "../../players/get-player.decorator";
import { Player } from "../../players/player.entity";
import { RelationStatus } from "../relation_status.enum";

export class GetRelationFilterDto {

	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	id: number;

	@IsOptional()
	@IsIn([RelationStatus.FRIEND, RelationStatus.BLOCKED])
	status: RelationStatus;

	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	receiver: number;

	@IsOptional()
	@IsNotEmpty()
	sender: Player;
}