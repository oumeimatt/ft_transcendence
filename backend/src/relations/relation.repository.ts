import { BadRequestException, forwardRef, Inject } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Player } from "../players/player.entity";
import { GetRelationFilterDto } from "./dto-relation/get-relation-filter.dto";
import { Relation } from "./relation.entity";
import { RelationStatus } from "./relation_status.enum";

@EntityRepository(Relation)
export class RelationRepository extends Repository<Relation> {
	constructor(
		// @Inject(forwardRef( () => UsersService))
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
		const friend = await this.findOne({ where: { sender: user, receiver: blocked_id, status: RelationStatus.FRIEND } });
		if (friend) {
			friend.status = RelationStatus.BLOCKED;
			await friend.save();
			return friend;
		}
		// const relation = new Relation();
		// // relation.receiver = await this.userService.getUserById(recv_id);
		// relation.receiver = blocked_id;
		// relation.sender = user;
		// relation.status = RelationStatus.BLOCKED;
		// await relation.save();
		// console.log('friend blocked suuccessfully');
		// return relation; //= cannot block user who is not your friend
	}
}