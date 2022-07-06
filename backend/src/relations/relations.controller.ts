import { Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetPlayer } from "../players/get-player.decorator";
import { Player } from "../players/player.entity";
import { Relation } from "./relation.entity";
import { RelationsService } from "./relations.service";
import { RelationStatus } from "./relation_status.enum";
import { Request } from "express";
import { UsersService } from "../players/players.service";


@Controller('/relation')
// @UseGuards(AuthGuard())
export class RelationsController {
	constructor(
		private readonly relationService: RelationsService,
		private readonly usersService: UsersService,
	) {}

	// @Get()
	// getRelations(@Query(ValidationPipe) FilterDto: GetRelationFilterDto): Promise<Relation[]> {
	// 	return this.relationService.getRelations(FilterDto);
	// }

	// @Get('/:id')
	// getRelationById(@Param('id', ParseIntPipe) id: number): Promise<Relation> {
	// 	return this.relationService.getRelationById(id);
	// }

	// @Get()

	@Post('add/:id')
	@UsePipes(ValidationPipe)
	async addFriend(
		@Req() req: Request,
		@Param('id', ParseIntPipe) friend_id: number,
	): Promise<Relation> {
		const user = await this.usersService.verifyToken(req.cookies.connect_sid);
		return this.relationService.addFriend(user, friend_id);
	}

	@Post('block/:id')
	@UsePipes(ValidationPipe)
	async blockPlayer(
		@Req() req: Request,
		@Param('id', ParseIntPipe) blocked_id: number,
	): Promise<Relation> {
		const user = await this.usersService.verifyToken(req.cookies.connect_sid);
		return this.relationService.blockPlayer(user, blocked_id);
	}

	@Delete('unblock/:id')
	async unblock(
		@Req() req: Request,
		@Param('id', ParseIntPipe) unblock_id: number,
	): Promise<void> {
		const user = await this.usersService.verifyToken(req.cookies.connect_sid);
		return this.relationService.unblock(user, unblock_id);
	}

	@Delete('unfollow/:id')
	async removeFriend(
		@Req() req: Request,
		@Param('id', ParseIntPipe) unfollow_id: number,
	): Promise<void> {
		const user = await this.usersService.verifyToken(req.cookies.connect_sid);
		return this.relationService.removeFriend(user, unfollow_id);
	}

}