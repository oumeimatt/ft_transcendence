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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const room_repository_1 = require("./room.repository");
const membership_entity_1 = require("./membership.entity");
const typeorm_2 = require("typeorm");
const membership_model_1 = require("./dto/membership.model");
const message_entity_1 = require("./message.entity");
const auth_service_1 = require("../auth/auth.service");
const player_repository_1 = require("../players/player.repository");
const players_service_1 = require("../players/players.service");
let ChatService = class ChatService {
    constructor(roomRepo, membershipRepo, messageRepo, authService, PlayerRepository, userService) {
        this.roomRepo = roomRepo;
        this.membershipRepo = membershipRepo;
        this.messageRepo = messageRepo;
        this.authService = authService;
        this.PlayerRepository = PlayerRepository;
        this.userService = userService;
    }
    async createRoom(RoomDto, creators) {
        return await this.roomRepo.createRoom(RoomDto, creators);
    }
    async getRoomById(id) {
        return await this.roomRepo.getRoomById(id);
    }
    async getMembersByRoomId(roomid) {
        const usersid = await this.membershipRepo
            .createQueryBuilder('m')
            .where('m.roomid = :roomid', { roomid })
            .select(['m.playerid'])
            .getMany();
        const members = [];
        for (var id of usersid)
            members.push(await this.userService.getUserById(id.playerid));
        return members;
    }
    async getRoomsForUser(playerid) {
        const roomsid = await this.membershipRepo
            .createQueryBuilder('p')
            .where('p.playerid = :playerid', { playerid })
            .select(['p.roomid'])
            .getMany();
        let rooms = [];
        for (var id of roomsid)
            rooms.push(await this.getRoomById(id.roomid));
        return rooms;
    }
    async addMember(room, creator, role) {
        return await this.roomRepo.addMember(room, creator, role);
    }
    async createMessage(messageDto, sender) {
        const { id, content } = messageDto;
        const Message = new message_entity_1.message();
        Message.content = content;
        Message.Player = sender;
        Message.room = await await this.getRoomById(id);
        await Message.save();
        return Message;
    }
    async getMessagesByroomId(roomid) {
        const query = await this.messageRepo.createQueryBuilder('message')
            .select(['message.content', 'message.playerid'])
            .where("message.roomid = :roomid", { roomid })
            .orderBy("message.created_at");
        const messages = await query.getMany();
        return messages;
    }
    async deleteMmebership(roomid, playrid) {
        await this.membershipRepo.delete({ playerid: playrid, roomid: roomid });
    }
    async isMember(roomid, playerid) {
        const membership = await this.membershipRepo.findOne({ playerid, roomid });
        if (membership)
            return membership;
        return null;
    }
    async getAllRooms(playerid) {
        const rooms = await this.roomRepo.createQueryBuilder('chatroom')
            .getMany();
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].ispublic === false && await this.isMember(rooms[i].id, playerid) === null)
                rooms.splice(i, 1);
        }
        return rooms;
    }
    async getRole(roomid, playerid) {
        const role = await this.membershipRepo.createQueryBuilder('m')
            .where('m.playerid = :playerid', { playerid })
            .andWhere('m.roomid = :roomid', { roomid })
            .select('m.role')
            .getOne();
        return role;
    }
    async createMembership(playerid, roomid) {
        const Membership = new membership_entity_1.membership();
        Membership.playerid = playerid;
        Membership.roomid = roomid;
        Membership.role = membership_model_1.RoleStatus.USER;
        await Membership.save();
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(room_repository_1.roomRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(membership_entity_1.membership)),
    __param(2, (0, typeorm_1.InjectRepository)(message_entity_1.message)),
    __param(4, (0, typeorm_1.InjectRepository)(player_repository_1.PlayerRepository)),
    __metadata("design:paramtypes", [room_repository_1.roomRepository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        auth_service_1.AuthService,
        player_repository_1.PlayerRepository,
        players_service_1.UsersService])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map