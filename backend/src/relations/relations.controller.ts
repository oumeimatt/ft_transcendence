import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetPlayer } from "../players/get-player.decorator";
import { Player } from "../players/player.entity";
import { CreateRelationDto } from "./dto-relation/create-relation.dto";
import { GetRelationFilterDto } from "./dto-relation/get-relation-filter.dto";
import { Relation } from "./relation.entity";
import { RelationsService } from "./relations.service";
import { RelationStatus } from "./relation_status.enum";

@Controller('link')
@UseGuards(AuthGuard())
export class RelationsController {
	constructor(private readonly relationService: RelationsService) {}

	// @Get()
	// getRelations(@Query(ValidationPipe) FilterDto: GetRelationFilterDto): Promise<Relation[]> {
	// 	return this.relationService.getRelations(FilterDto);
	// }

	// @Get('/:id')
	// getRelationById(@Param('id', ParseIntPipe) id: number): Promise<Relation> {
	// 	return this.relationService.getRelationById(id);
	// }

	// @Get()


	@Get('/:user')
	getRelationByUser(@GetPlayer() player: Player): Promise<Relation[]> {
		return this.relationService.getRelationByUser(player.id, RelationStatus.FRIEND); //& get all friends
	}

	@Post('add/:id')
	@UsePipes(ValidationPipe)
	addFriend(
		// @Body() createRelationDto: CreateRelationDto,
		@Param('id', ParseIntPipe) recv_id: number,
		@GetPlayer() sender: Player,
	): Promise<Relation> {
		// return this.relationService.addFriend(createRelationDto, sender);
		return this.relationService.addFriend(recv_id, sender);
	}

	@Post('block/:id')
	@UsePipes(ValidationPipe)
	blockPlayer(
		@Param('id', ParseIntPipe) recv_id: number,
		@GetPlayer() sender: Player,
	): Promise<Relation> {
		return this.relationService.blockPlayer(recv_id, sender);
	}

	@Delete('unblock')
	unblock(@GetPlayer() sender: Player): Promise<void> {
		return this.relationService.unblock(sender.id);
	}

	@Delete('unfollow')
	removeFriend(@GetPlayer() sender: Player): Promise<void> {
		return this.relationService.removeFriend(sender.id);
	}

}