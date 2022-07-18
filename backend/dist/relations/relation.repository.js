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
    async addFriend(user, friend_id) {
        const blocked = await this.findOne({ where: { sender: user, receiver: friend_id, status: relation_status_enum_1.RelationStatus.BLOCKED } });
        if (blocked) {
            console.log('user is blocked !!!!!!!!!!!!');
            throw new common_1.BadRequestException('You cannot add this user');
        }
        const relation = new relation_entity_1.Relation();
        relation.receiver = friend_id;
        relation.sender = user;
        relation.status = relation_status_enum_1.RelationStatus.FRIEND;
        await relation.save();
        console.log('friend added suuccessfully');
        return relation;
    }
    async blockPlayer(user, blocked_id) {
        const blocked = await this.findOne({ where: { sender: user, receiver: blocked_id, status: relation_status_enum_1.RelationStatus.FRIEND } });
        if (blocked) {
            blocked.status = relation_status_enum_1.RelationStatus.BLOCKED;
            await blocked.save();
            return blocked;
        }
        const relation = new relation_entity_1.Relation();
        relation.receiver = blocked_id;
        relation.sender = user;
        relation.status = relation_status_enum_1.RelationStatus.BLOCKED;
        await relation.save();
        console.log('friend blocked suuccessfully');
        return relation;
    }
};
RelationRepository = __decorate([
    (0, typeorm_1.EntityRepository)(relation_entity_1.Relation),
    __metadata("design:paramtypes", [])
], RelationRepository);
exports.RelationRepository = RelationRepository;
//# sourceMappingURL=relation.repository.js.map