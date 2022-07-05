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
exports.RelationsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const get_player_decorator_1 = require("../players/get-player.decorator");
const player_entity_1 = require("../players/player.entity");
const relations_service_1 = require("./relations.service");
const relation_status_enum_1 = require("./relation_status.enum");
let RelationsController = class RelationsController {
    constructor(relationService) {
        this.relationService = relationService;
    }
    getRelationByUser(player) {
        return this.relationService.getRelationByUser(player.id, relation_status_enum_1.RelationStatus.FRIEND);
    }
    addFriend(recv_id, sender) {
        return this.relationService.addFriend(recv_id, sender);
    }
    blockPlayer(recv_id, sender) {
        return this.relationService.blockPlayer(recv_id, sender);
    }
    unblock(sender) {
        return this.relationService.unblock(sender.id);
    }
    removeFriend(sender) {
        return this.relationService.removeFriend(sender.id);
    }
};
__decorate([
    (0, common_1.Get)('/:user'),
    __param(0, (0, get_player_decorator_1.GetPlayer)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [player_entity_1.Player]),
    __metadata("design:returntype", Promise)
], RelationsController.prototype, "getRelationByUser", null);
__decorate([
    (0, common_1.Post)('add/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, get_player_decorator_1.GetPlayer)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, player_entity_1.Player]),
    __metadata("design:returntype", Promise)
], RelationsController.prototype, "addFriend", null);
__decorate([
    (0, common_1.Post)('block/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, get_player_decorator_1.GetPlayer)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, player_entity_1.Player]),
    __metadata("design:returntype", Promise)
], RelationsController.prototype, "blockPlayer", null);
__decorate([
    (0, common_1.Delete)('unblock'),
    __param(0, (0, get_player_decorator_1.GetPlayer)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [player_entity_1.Player]),
    __metadata("design:returntype", Promise)
], RelationsController.prototype, "unblock", null);
__decorate([
    (0, common_1.Delete)('unfollow'),
    __param(0, (0, get_player_decorator_1.GetPlayer)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [player_entity_1.Player]),
    __metadata("design:returntype", Promise)
], RelationsController.prototype, "removeFriend", null);
RelationsController = __decorate([
    (0, common_1.Controller)('link'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [relations_service_1.RelationsService])
], RelationsController);
exports.RelationsController = RelationsController;
//# sourceMappingURL=relations.controller.js.map