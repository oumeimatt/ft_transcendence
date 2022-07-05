import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Player } from "../players/player.entity";
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

	async getRelationByUser(player_id: number, relation_status: RelationStatus): Promise<Relation[]> {
		return this.relationRepository.getRelationByUser(player_id, relation_status);
	}

	async addFriend(recv_id: number, sender: Player): Promise<Relation> {
		return this.relationRepository.addFriend(recv_id, sender);
	}

	async blockPlayer(recv_id: number, sender: Player): Promise<Relation> {
		return this.relationRepository.blockPlayer(recv_id, sender);
	}

	async unblock(id: number): Promise<void> {
		const rel = await this.relationRepository.getOneRelation(id, RelationStatus.BLOCKED);
		const block = await this.relationRepository.delete(rel.id);
		if (!block.affected){
			throw new NotFoundException(`Relation with ID "${id}" not found`)
		}
	}

	async removeFriend(id: number): Promise<void> {
		const rel = await this.relationRepository.getOneRelation(id, RelationStatus.FRIEND);
		const friend = await this.relationRepository.delete(rel.id);
		if (!friend.affected){
			throw new NotFoundException(`Relation with ID "${id}" not found`)
		}
	}
}