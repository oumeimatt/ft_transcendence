"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const relation_entity_1 = require("./relation.entity");
const relation_status_enum_1 = require("./relation_status.enum");
let RelationRepository = class RelationRepository extends typeorm_1.Repository {
    constructor() { super(); }
    async getRelations(FilterDto) {
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
    async addFriend(user, friend) {
        const blocked = await this.findOne({ where: { sender: user, receiver: friend.id, status: relation_status_enum_1.RelationStatus.BLOCKED } });
        const blocked2 = await this.findOne({ where: { sender: friend, receiver: user.id, status: relation_status_enum_1.RelationStatus.BLOCKED } });
        if (blocked || blocked2) {
            console.log('You cannot add this user, user is blocked !');
            throw new common_1.BadRequestException('You cannot add this user, user is blocked');
        }
        const relation_user = new relation_entity_1.Relation();
        relation_user.receiver = friend.id;
        relation_user.sender = user;
        relation_user.status = relation_status_enum_1.RelationStatus.FRIEND;
        await relation_user.save();
        const relation_friend = new relation_entity_1.Relation();
        relation_friend.receiver = user.id;
        relation_friend.sender = friend;
        relation_friend.status = relation_status_enum_1.RelationStatus.FRIEND;
        await relation_friend.save();
        console.log('friend added suuccessfully');
        return relation_user;
    }
    async blockPlayer(user, blocked) {
        const friend = await this.findOne({ where: { sender: user, receiver: blocked.id, status: relation_status_enum_1.RelationStatus.FRIEND } });
        if (friend) {
            friend.status = relation_status_enum_1.RelationStatus.BLOCKED;
            await friend.save();
            await this.delete({ sender: blocked, receiver: user.id, status: relation_status_enum_1.RelationStatus.FRIEND });
            return friend;
        }
    }
    async checkBlock(user, blocked) {
        const relation = await this.findOne({ where: { sender: user, receiver: blocked.id, status: relation_status_enum_1.RelationStatus.BLOCKED } });
        const relation2 = await this.findOne({ where: { sender: blocked, receiver: user.id, status: relation_status_enum_1.RelationStatus.BLOCKED } });
        if (relation)
            return relation;
        else if (relation2)
            return relation2;
        return null;
    }
};
RelationRepository = __decorate([
    (0, typeorm_1.EntityRepository)(relation_entity_1.Relation),
    __metadata("design:paramtypes", [])
], RelationRepository);
exports.RelationRepository = RelationRepository;
//# sourceMappingURL=relation.repository.js.map