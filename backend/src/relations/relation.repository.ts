import { forwardRef, Inject } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Player } from "../players/player.entity";
import { UsersService } from "../players/players.service";
import { CreateRelationDto } from "./dto-relation/create-relation.dto";
import { GetRelationFilterDto } from "./dto-relation/get-relation-filter.dto";
import { Relation } from "./relation.entity";
import { RelationStatus } from "./relation_status.enum";

@EntityRepository(Relation)
export class RelationRepository extends Repository<Relation> {
	constructor(
		// @Inject(forwardRef( () => UsersService))
		private userService: UsersService
	) { super() }

	async getRelations(FilterDto: GetRelationFilterDto): Promise<Relation[]> {
		const { id, status } = FilterDto;
		const query = this.createQueryBuilder('relation');
		if (id) {
			query.andWhere('relation.id = :id', { id });
		}
		if (status) {
			query.andWhere('relation.status = :status', { status });
		}
		const relations = await query.getMany();
		return relations;
	}

	async getRelationByUser(player_id: number, relation_status: RelationStatus): Promise<Relation[]> {
		const relations = await this.createQueryBuilder('relation')
			.leftJoinAndSelect('relation.receiver', 'receivers')
			.andWhere('receiver.id = :id', { id: player_id })
			.andWhere('sender.id = :id', { id: player_id }) //? or
			.andWhere('status = :relation_status', { relation_status: relation_status})
			.getMany();
		return relations;
	}

	async getOneRelation(player_id: number, relation_status: RelationStatus): Promise<Relation> {
		const relations = await this.createQueryBuilder('relation')
			.leftJoinAndSelect('relation.receiver', 'receivers')
			.andWhere('receiver.id = :id', { id: player_id })
			.andWhere('sender.id = :id', { id: player_id })
			.andWhere('status = :relation_status', { relation_status: relation_status})
			.getOne();
		return relations;
	}

	async addFriend(recv_id: number, sender: Player): Promise<Relation> {
		const relation = new Relation();
		relation.receiver = await this.userService.getUserById(recv_id);
		relation.sender = sender;
		relation.status = RelationStatus.FRIEND;
		await relation.save();
		return relation;
	}

	async blockPlayer(recv_id: number, sender: Player): Promise<Relation> {
		const relation = new Relation();
		relation.receiver = await this.userService.getUserById(recv_id);
		relation.sender = sender;
		relation.status = RelationStatus.BLOCKED;
		await relation.save();
		return relation;
	}

}