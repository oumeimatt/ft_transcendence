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
const relations_service_1 = require("../relations/relations.service");
const bcrypt = require("bcrypt");
let ChatService = class ChatService {
    constructor(roomRepo, membershipRepo, messageRepo, authService, PlayerRepository, userService, relationService) {
        this.roomRepo = roomRepo;
        this.membershipRepo = membershipRepo;
        this.messageRepo = messageRepo;
        this.authService = authService;
        this.PlayerRepository = PlayerRepository;
        this.userService = userService;
        this.relationService = relationService;
    }
    async createRoom(RoomDto, creators) {
        return await this.roomRepo.createRoom(RoomDto, creators);
    }
    async createDM(sender, receiver) {
        const chatroom = await this.roomRepo.createDM(sender, receiver);
        let User = await this.userService.getUserById(sender);
        await this.addMember(chatroom, User, membership_model_1.RoleStatus.USER);
        User = await this.userService.getUserById(receiver);
        await this.addMember(chatroom, User, membership_model_1.RoleStatus.USER);
        return chatroom;
    }
    async getRoomById(id) {
        return await this.roomRepo.getRoomById(id);
    }
    async getRoomByName(name) {
        return await this.roomRepo.findOne({ name: name });
    }
    async getMembersByRoomId(roomid, playerid) {
        let membersObj = [];
        if (await this.isMember(roomid, playerid)) {
            const usersid = await this.membershipRepo
                .createQueryBuilder('m')
                .where('m.roomid = :roomid', { roomid })
                .select(['m.playerid', 'm.role'])
                .getMany();
            const members = [];
            for (var id of usersid) {
                let memberObj = { member: await this.userService.getUserById(id.playerid), role: id.role, isbanned: id.isbanned, ismuted: id.ismuted };
                membersObj.push(memberObj);
            }
        }
        return membersObj;
    }
    async getRoomsForUser(playerid) {
        const isbanned = false;
        const roomsid = await this.membershipRepo
            .createQueryBuilder('p')
            .where('p.playerid = :playerid', { playerid })
            .andWhere('p.isbanned = :isbanned', { isbanned })
            .select(['p.roomid'])
            .getMany();
        let rooms = [];
        for (var id of roomsid)
            rooms.push(await this.roomRepo.getChatroomById(id.roomid));
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
    async getMessagesByroomId(roomid, playerid) {
        let messages = [];
        if (await this.isMember(roomid, playerid)) {
            const query = await this.messageRepo.createQueryBuilder('message')
                .select(['message.content', 'message.playerid', 'message.roomid'])
                .where("message.roomid = :roomid", { roomid })
                .orderBy("message.created_at");
            messages = await query.getMany();
            let i = 0;
            while (i < messages.length) {
                if (await this.relationService.checkBlock(messages[i].playerid, playerid) != null)
                    messages.splice(i, 1);
                else
                    i++;
            }
        }
        return messages;
    }
    async getDMs(userid, receiverid) {
        let messages = [];
        if (await this.relationService.checkBlock(userid, receiverid) == null) {
            let room = await this.getRoomByName(userid + ":" + receiverid);
            if (!room)
                room = await this.getRoomByName(receiverid + ":" + userid);
            if (room)
                messages = await this.getMessagesByroomId(room.id, userid);
        }
        return messages;
    }
    async deleteMmebership(roomid, playrid) {
        await this.membershipRepo.delete({ playerid: playrid, roomid: roomid });
    }
    async isMember(roomid, playerid) {
        const membership = await this.membershipRepo.findOne({ playerid: playerid, roomid: roomid, isbanned: false });
        if (membership)
            return membership;
        return null;
    }
    async getMembership(roomid, playerid) {
        let membership = await this.membershipRepo.findOne({ playerid: playerid, roomid: roomid });
        return membership;
    }
    async isBanned(roomid, playerid) {
        let result = await this.membershipRepo.findOne({ roomid: roomid, playerid: playerid });
        if (result && result.isbanned == true)
            return true;
        return false;
    }
    async getAllRooms(playerid) {
        const rooms = await this.roomRepo.createQueryBuilder('chatroom')
            .select(['chatroom.id', 'chatroom.name', 'chatroom.ispublic', 'chatroom.ischannel'])
            .getMany();
        let i = 0;
        while (i < rooms.length) {
            if ((rooms[i].ispublic == false && await this.isMember(rooms[i].id, playerid) === null) || (rooms[i].ispublic == true && await this.isBanned(rooms[i].id, playerid) == true)) {
                rooms.splice(i, 1);
            }
            else
                i++;
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
        const found = await this.membershipRepo.find({ playerid: playerid, roomid: roomid });
        if (!found) {
            const Membership = new membership_entity_1.membership();
            Membership.playerid = playerid;
            Membership.roomid = roomid;
            Membership.isbanned = false;
            Membership.ismuted = false;
            Membership.role = membership_model_1.RoleStatus.USER;
            await Membership.save();
        }
    }
    async DMexist(senderid, receiverid) {
        let chatroomName = senderid + ":" + receiverid;
        let room = await this.roomRepo.findOne({ name: chatroomName, ischannel: false });
        if (room)
            return room;
        chatroomName = receiverid + ":" + senderid;
        room = await this.roomRepo.findOne({ name: chatroomName, ischannel: false });
        if (room)
            return room;
        return null;
    }
    async updateMembership(playerid, roomid, role) {
        const membership = await this.membershipRepo.findOne({ playerid: playerid, roomid: roomid });
        membership.role = role;
        await membership.save();
        return membership;
    }
    async updatePassword(roomid, password) {
        let room = await this.getRoomById(roomid);
        let salt = await bcrypt.genSalt();
        room.password = await bcrypt.hash(password, salt);
        room.salt = salt;
        await room.save();
        return room;
    }
    async updateBanStatus(playerid, roomid, ban) {
        const membership = await this.membershipRepo.findOne({ playerid: playerid, roomid: roomid });
        membership.isbanned = ban;
        await membership.save();
        return membership;
    }
    async updateMuteStatus(playerid, roomid, mute) {
        const membership = await this.membershipRepo.findOne({ playerid: playerid, roomid: roomid });
        membership.ismuted = mute;
        await membership.save();
        return membership;
    }
    async validatingRoomPwd(room, password) {
        const hash = await bcrypt.hash(password, room.salt);
        if (room.password === hash)
            return true;
        return false;
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
        players_service_1.UsersService,
        relations_service_1.RelationsService])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map