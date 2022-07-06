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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const players_service_1 = require("../players/players.service");
const relation_repository_1 = require("./relation.repository");
const relation_status_enum_1 = require("./relation_status.enum");
let RelationsService = class RelationsService {
    constructor(relationRepository, usersService) {
        this.relationRepository = relationRepository;
        this.usersService = usersService;
    }
    async getRelations(FilterDto) {
        return this.relationRepository.getRelations(FilterDto);
    }
    async getRelationByUser(user, relation_status) {
        return this.relationRepository.getRelationByUser(user, relation_status);
    }
    async getAllFriends(user) {
        const friend_relations = await this.relationRepository.getRelationByUser(user, relation_status_enum_1.RelationStatus.FRIEND);
        var friends = new Array();
        for (var relation of friend_relations) {
            const player = await this.usersService.getUserById(relation.receiver);
            friends.push(player);
        }
        return friends;
    }
    async addFriend(user, friend_id) {
        return this.relationRepository.addFriend(user, friend_id);
    }
    async blockPlayer(user, blocked_id) {
        return this.relationRepository.blockPlayer(user, blocked_id);
    }
    async unblock(user, blocked_id) {
        const rel = await this.relationRepository.getOneRelation(user.id, blocked_id, relation_status_enum_1.RelationStatus.BLOCKED);
        const block = await this.relationRepository.delete(rel.id);
        if (!block.affected) {
            throw new common_1.NotFoundException(`User with ID "${blocked_id}" not found`);
        }
    }
    async removeFriend(user, friend_id) {
        const rel = await this.relationRepository.getOneRelation(user.id, friend_id, relation_status_enum_1.RelationStatus.FRIEND);
        const friend = await this.relationRepository.delete(rel.id);
        if (!friend.affected) {
            throw new common_1.NotFoundException(`Friend with ID "${friend_id}" not found`);
        }
    }
};
RelationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(relation_repository_1.RelationRepository)),
    __metadata("design:paramtypes", [relation_repository_1.RelationRepository,
        players_service_1.UsersService])
], RelationsService);
exports.RelationsService = RelationsService;
//# sourceMappingURL=relations.service.js.map