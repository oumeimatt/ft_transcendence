import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Player } from "../players/player.entity";
import { UsersService } from "../players/players.service";
import { UserStatus } from "../players/player_status.enum";
import { CreateRelationDto } from "./dto-relation/create-relation.dto";
import { GetRelationFilterDto } from "./dto-relation/get-relation-filter.dto";
import { Relation } from "./relation.entity";
import { RelationRepository } from "./relation.repository";
import { RelationStatus } from "./relation_status.enum";

@Injectable()
export class RelationsService {
	constructor(
		@InjectRepository(RelationRepository)
		private relationRepository: RelationRepository,
		private readonly usersService: UsersService,
	) {}

	async getRelations(FilterDto: GetRelationFilterDto):Promise<Relation[]> { 
		return this.relationRepository.getRelations(FilterDto);
	}

	// async getRelationById(id: number): Promise<Relation> {
	// 	const found = await this.relationRepository.findOne(id);
	// 	if (!found){
	// 		throw new NotFoundException(`Relation with ID "${id}" not found`)
	// 	}
	// 	return found;
	// }

	async getRelationByUser(user:Player, relation_status: RelationStatus): Promise<Relation[]> {
		return this.relationRepository.getRelationByUser(user, relation_status);
	}

	async getAllFriends(user: Player) : Promise<Player[]> {

		const friend_relations = await this.relationRepository.getRelationByUser(user, RelationStatus.FRIEND);
		var friends = new Array();
		for (var relation of friend_relations) {
			const player = await this.usersService.getUserById(relation.receiver);
			friends.push(player);
		}
		return friends;
	}

	async addFriend(user: Player, friend_id: number): Promise<Relation> {
		return this.relationRepository.addFriend(user, friend_id);
	}

	async blockPlayer(user: Player, blocked_id: number): Promise<Relation> {
		return this.relationRepository.blockPlayer(user, blocked_id);
	}

	async unblock(user: Player, blocked_id: number): Promise<void> {
		const rel = await this.relationRepository.getOneRelation(user.id, blocked_id, RelationStatus.BLOCKED);
		const block = await this.relationRepository.delete(rel.id);
		if (!block.affected){
			throw new NotFoundException(`User with ID "${blocked_id}" not found`)
		}
	}

	async removeFriend(user: Player, friend_id: number): Promise<void> {
		const rel = await this.relationRepository.getOneRelation(user.id, friend_id, RelationStatus.FRIEND);
		const friend = await this.relationRepository.delete(rel.id);
		if (!friend.affected){
			throw new NotFoundException(`Friend with ID "${friend_id}" not found`)
		}
	}
}