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
const typeorm_2 = require("typeorm");
const players_service_1 = require("../players/players.service");
const relation_entity_1 = require("./relation.entity");
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
    async getUsersByStatus(user, status) {
        const friend_relations = await (0, typeorm_2.getRepository)(relation_entity_1.Relation).find({ where: { sender: user, status: status } });
        var friends = new Array();
        for (var relation of friend_relations) {
            const player = await this.usersService.getUserById(relation.receiver);
            friends.push(player);
        }
        return friends;
    }
    async addFriend(user, friend_id) {
        const friend = await this.usersService.getUserById(friend_id);
        return this.relationRepository.addFriend(user, friend);
    }
    async blockPlayer(user, blocked_id) {
        const blocked = await this.usersService.getUserById(blocked_id);
        return this.relationRepository.blockPlayer(user, blocked);
    }
    async unblock(user, blocked_id) {
        await this.relationRepository.delete({ sender: user, receiver: blocked_id, status: relation_status_enum_1.RelationStatus.BLOCKED });
        console.log('friend unblocked');
    }
    async removeFriend(user, friend_id) {
        const friend = await this.usersService.getUserById(friend_id);
        await this.relationRepository.delete({ sender: user, receiver: friend_id, status: relation_status_enum_1.RelationStatus.FRIEND });
        await this.relationRepository.delete({ sender: friend, receiver: user.id, status: relation_status_enum_1.RelationStatus.FRIEND });
        console.log('friend removed');
    }
    async checkBlock(user_id, blocked_id) {
        const blocked = await this.usersService.getUserById(blocked_id);
        let user = await this.usersService.getUserById(user_id);
        return await this.relationRepository.checkBlock(user, blocked);
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