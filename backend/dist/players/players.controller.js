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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const players_service_1 = require("./players.service");
const get_player_filter_dto_1 = require("./dto-players/get-player-filter.dto");
const relations_service_1 = require("../relations/relations.service");
const jwt_1 = require("@nestjs/jwt");
const fs = require("fs");
const platform_express_1 = require("@nestjs/platform-express");
const relation_status_enum_1 = require("../relations/relation_status.enum");
let UsersController = class UsersController {
    constructor(usersService, relationService, jwtService) {
        this.usersService = usersService;
        this.relationService = relationService;
        this.jwtService = jwtService;
    }
    async getProfile(req) {
        const user = await this.usersService.verifyToken(req.cookies.connect_sid);
        const playerData = await this.usersService.getUserById(user.id);
        const friends = await this.relationService.getUsersByStatus(user, relation_status_enum_1.RelationStatus.FRIEND);
        const blockedUsers = await this.relationService.getUsersByStatus(user, relation_status_enum_1.RelationStatus.BLOCKED);
        const achievements = await this.usersService.getAchievements(user.id);
        const data = {
            "profile": playerData,
            "friends": friends,
            "blockedUsers": blockedUsers,
            "achievements": achievements,
            "cookie": req.cookies.connect_sid,
        };
        return data;
    }
    async getFriendProfile(req, id) {
        const user = await this.usersService.verifyToken(req.cookies.connect_sid);
        const playerData = await this.usersService.getUserById(id);
        const friends = await this.relationService.getUsersByStatus(playerData, relation_status_enum_1.RelationStatus.FRIEND);
        const blockedUsers = await this.relationService.getUsersByStatus(user, relation_status_enum_1.RelationStatus.BLOCKED);
        const achievements = await this.usersService.getAchievements(id);
        const data = {
            "profile": playerData,
            "friends": friends,
            "blockedUsers": blockedUsers,
            "achievements": achievements,
        };
        return data;
    }
    async updateUsername(req, username) {
        const user = await this.usersService.verifyToken(req.cookies.connect_sid);
        return this.usersService.updateUsername(user.id, username);
    }
    async updateAvatar(req, imageName, avatar) {
        const user = await this.usersService.verifyToken(req.cookies.connect_sid);
        fs.writeFileSync(process.cwd().substring(0, process.cwd().length - 7) + "frontend/src/assets/" + imageName, avatar.buffer);
        console.log("imagename === ", imageName);
        return this.usersService.updateAvatar(user.id, imageName);
    }
    async updateTwoFa(req) {
        const user = await this.usersService.verifyToken(req.cookies.connect_sid);
        return this.usersService.updateTwoFa(user.id);
    }
    async getUsers(FilterDto, req) {
        const user = await this.usersService.verifyToken(req.cookies.connect_sid);
        return this.usersService.getUsers(FilterDto);
    }
};
__decorate([
    (0, common_1.Get)('/profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('/profile/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getFriendProfile", null);
__decorate([
    (0, common_1.Patch)('/settings/username'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUsername", null);
__decorate([
    (0, common_1.Post)('/settings/avatar/:imageName'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('imageName')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateAvatar", null);
__decorate([
    (0, common_1.Patch)('/settings/2fa'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateTwoFa", null);
__decorate([
    (0, common_1.Get)('/users'),
    __param(0, (0, common_1.Query)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_player_filter_dto_1.GetPlayersFilterDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
UsersController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [players_service_1.UsersService,
        relations_service_1.RelationsService,
        jwt_1.JwtService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=players.controller.js.map