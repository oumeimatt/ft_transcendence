import { BadRequestException, forwardRef, Inject } from "@nestjs/common";
import { log } from "console";
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
		// private userService: UsersService,
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

	// async getRelationByUser(user: Player, relation_status: RelationStatus): Promise<Relation[]> {
	// 	const relations = await this.createQueryBuilder('relation')
	// 		// .andWhere('sender.id = :id', { id: user.id })
	// 		.andWhere('status = :relation_status', { relation_status: relation_status})
	// 		.getMany();
	// 	return relations;
	// }

	// async gettest(user: Player, relation_status: RelationStatus): Promise<[]> {
		// const relations = await this.createQueryBuilder('relation')
		// 	// .andWhere('sender.id = :id', { id: user.id })
		// 	.andWhere('status = :relation_status', { relation_status: relation_status})
		// 	.getMany();
		// return relations;
	// }

	// async getOneRelation(user_id: number, friend_id: number,relation_status: RelationStatus): Promise<Relation> {
	// 	const relations = await this.createQueryBuilder('relation')
	// 		.andWhere('receiver = :id', { id: friend_id })
	// 		.andWhere('sender.id = :id', { id: user_id })
	// 		.andWhere('status = :relation_status', { relation_status: relation_status})
	// 		.getOne();
	// 	return relations;
	// }

	async addFriend(user: Player, friend_id: number): Promise<Relation> {

		//td: check if the user is not blocked -> add friend
		const blocked = await this.findOne({ where: { sender: user, receiver: friend_id, status: RelationStatus.BLOCKED } });
		if (blocked) {
			console.log('user is blocked !!!!!!!!!!!!');
			throw new BadRequestException('You cannot add this user');
		}
		const relation = new Relation();
		relation.receiver = friend_id;
		relation.sender = user;
		relation.status = RelationStatus.FRIEND;
		await relation.save();
		console.log('friend added suuccessfully');
		return relation;
	}

	async blockPlayer(user: Player, blocked_id: number): Promise<Relation> {

		//td: check if the user is a friend -> remove from friend list
		// const friend = await this.getOneRelation(user.id, blocked_id, RelationStatus.FRIEND);
		const blocked = await this.findOne({ where: { sender: user, receiver: blocked_id, status: RelationStatus.FRIEND } });
		if (blocked) {
			blocked.status = RelationStatus.BLOCKED;
			await blocked.save();
			return blocked;
		}
		const relation = new Relation();
		// relation.receiver = await this.userService.getUserById(recv_id);
		relation.receiver = blocked_id;
		relation.sender = user;
		relation.status = RelationStatus.BLOCKED;
		await relation.save();
		console.log('friend blocked suuccessfully');
		return relation;
	}
}