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
const typeorm_1 = require("typeorm");
const players_service_1 = require("../players/players.service");
const relation_entity_1 = require("./relation.entity");
const relation_status_enum_1 = require("./relation_status.enum");
let RelationRepository = class RelationRepository extends typeorm_1.Repository {
    constructor(userService) {
        super();
        this.userService = userService;
    }
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
    async getRelationByUser(player_id, relation_status) {
        const relations = await this.createQueryBuilder('relation')
            .leftJoinAndSelect('relation.receiver', 'receivers')
            .andWhere('receiver.id = :id', { id: player_id })
            .andWhere('sender.id = :id', { id: player_id })
            .andWhere('status = :relation_status', { relation_status: relation_status })
            .getMany();
        return relations;
    }
    async getOneRelation(player_id, relation_status) {
        const relations = await this.createQueryBuilder('relation')
            .leftJoinAndSelect('relation.receiver', 'receivers')
            .andWhere('receiver.id = :id', { id: player_id })
            .andWhere('sender.id = :id', { id: player_id })
            .andWhere('status = :relation_status', { relation_status: relation_status })
            .getOne();
        return relations;
    }
    async addFriend(recv_id, sender) {
        const relation = new relation_entity_1.Relation();
        relation.receiver = await this.userService.getUserById(recv_id);
        relation.sender = sender;
        relation.status = relation_status_enum_1.RelationStatus.FRIEND;
        await relation.save();
        return relation;
    }
    async blockPlayer(recv_id, sender) {
        const relation = new relation_entity_1.Relation();
        relation.receiver = await this.userService.getUserById(recv_id);
        relation.sender = sender;
        relation.status = relation_status_enum_1.RelationStatus.BLOCKED;
        await relation.save();
        return relation;
    }
};
RelationRepository = __decorate([
    (0, typeorm_1.EntityRepository)(relation_entity_1.Relation),
    __metadata("design:paramtypes", [players_service_1.UsersService])
], RelationRepository);
exports.RelationRepository = RelationRepository;
//# sourceMappingURL=relation.repository.js.map