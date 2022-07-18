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
const relations_service_1 = require("./relations.service");
const players_service_1 = require("../players/players.service");
let RelationsController = class RelationsController {
    constructor(relationService, usersService) {
        this.relationService = relationService;
        this.usersService = usersService;
    }
    async addFriend(req, friend_id) {
        const user = await this.usersService.verifyToken(req.cookies.connect_sid);
        return this.relationService.addFriend(user, friend_id);
    }
    async blockPlayer(req, blocked_id) {
        const user = await this.usersService.verifyToken(req.cookies.connect_sid);
        return this.relationService.blockPlayer(user, blocked_id);
    }
    async unblock(req, unblock_id) {
        const user = await this.usersService.verifyToken(req.cookies.connect_sid);
        return this.relationService.unblock(user, unblock_id);
    }
    async removeFriend(req, unfollow_id) {
        console.log('remove friend -');
        const user = await this.usersService.verifyToken(req.cookies.connect_sid);
        return this.relationService.removeFriend(user, unfollow_id);
    }
};
__decorate([
    (0, common_1.Post)('add/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], RelationsController.prototype, "addFriend", null);
__decorate([
    (0, common_1.Post)('block/:id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], RelationsController.prototype, "blockPlayer", null);
__decorate([
    (0, common_1.Delete)('unblock/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], RelationsController.prototype, "unblock", null);
__decorate([
    (0, common_1.Delete)('unfollow/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], RelationsController.prototype, "removeFriend", null);
RelationsController = __decorate([
    (0, common_1.Controller)('/relation'),
    __metadata("design:paramtypes", [relations_service_1.RelationsService,
        players_service_1.UsersService])
], RelationsController);
exports.RelationsController = RelationsController;
//# sourceMappingURL=relations.controller.js.map