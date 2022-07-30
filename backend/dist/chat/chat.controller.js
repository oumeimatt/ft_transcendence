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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const players_service_1 = require("../players/players.service");
const chat_service_1 = require("./chat.service");
let ChatController = class ChatController {
    constructor(chatService, usersService) {
        this.chatService = chatService;
        this.usersService = usersService;
    }
    async getAllMessageByRoomId(req, roomid, playerid) {
        let messages = [];
        try {
            let user = await this.usersService.verifyToken(req.cookies.connect_sid);
            messages = await this.chatService.getMessagesByroomId(roomid, playerid);
            return messages;
        }
        catch (_a) {
            throw new common_1.UnauthorizedException();
        }
    }
    async getMessages(req, userid, receiverid) {
        let dms = [];
        try {
            let user = await this.usersService.verifyToken(req.cookies.connect_sid);
            let dms = await this.chatService.getDMs(userid, receiverid);
            return dms;
        }
        catch (_a) {
            throw new common_1.UnauthorizedException();
        }
    }
    async getMembersByRoomId(req, roomid, playerid) {
        let members = [];
        try {
            let user = await this.usersService.verifyToken(req.cookies.connect_sid);
            members = await this.chatService.getMembersByRoomId(roomid, playerid);
            return members;
        }
        catch (_a) {
            throw new common_1.UnauthorizedException();
        }
        return;
    }
    async getRoomsByUserId(req, playerid) {
        let chatroom = [];
        try {
            let user = await this.usersService.verifyToken(req.cookies.connect_sid);
            chatroom = await this.chatService.getRoomsForUser(playerid);
            return chatroom;
        }
        catch (_a) {
            throw new common_1.UnauthorizedException();
        }
    }
    async getAllRooms(req, playerid) {
        let rooms = [];
        try {
            let user = await this.usersService.verifyToken(req.cookies.connect_sid);
            rooms = await this.chatService.getAllRooms(playerid);
            return rooms;
        }
        catch (_a) {
            throw new common_1.UnauthorizedException();
        }
    }
    async getMembership(req, roomid, playerid) {
        let membership;
        try {
            let user = await this.usersService.verifyToken(req.cookies.connect_sid);
            membership = await this.chatService.getMembership(roomid, playerid);
            return membership;
        }
        catch (_a) {
            throw new common_1.UnauthorizedException();
        }
    }
};
__decorate([
    (0, common_1.Get)('messages'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('roomid')),
    __param(2, (0, common_1.Query)('playerid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getAllMessageByRoomId", null);
__decorate([
    (0, common_1.Get)('DM'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('userid')),
    __param(2, (0, common_1.Query)('receiverid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Get)('members'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('roomid')),
    __param(2, (0, common_1.Query)('playerid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getMembersByRoomId", null);
__decorate([
    (0, common_1.Get)('mychannels'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('playerid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getRoomsByUserId", null);
__decorate([
    (0, common_1.Get)('allchannels'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('playerid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getAllRooms", null);
__decorate([
    (0, common_1.Get)('isMember'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('roomid')),
    __param(2, (0, common_1.Query)('playerid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getMembership", null);
ChatController = __decorate([
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService, players_service_1.UsersService])
], ChatController);
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map