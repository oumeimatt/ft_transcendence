"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomRepository = void 0;
const room_entity_1 = require("./room.entity");
const typeorm_1 = require("typeorm");
const membership_entity_1 = require("./membership.entity");
const membership_model_1 = require("./dto/membership.model");
const bcrypt = require("bcrypt");
let roomRepository = class roomRepository extends typeorm_1.Repository {
    async createRoom(RoomDto, creators) {
        const { name, privacy, password } = RoomDto;
        const Room = new room_entity_1.chatroom();
        Room.name = name;
        Room.ischannel = true;
        if (privacy === 'Private')
            Room.ispublic = false;
        Room.salt = await bcrypt.genSalt();
        Room.password = await bcrypt.hash(password, Room.salt);
        await Room.save();
        for (var user of creators) {
            const Membership = new membership_entity_1.membership();
            Membership.role = membership_model_1.RoleStatus.USER;
            Membership.Player = user;
            Membership.room = Room;
            Membership.isbanned = false;
            Membership.ismuted = false;
            await Membership.save();
        }
        return Room;
    }
    async createDM(sender, receiver) {
        const DM = new room_entity_1.chatroom();
        DM.name = sender + ":" + receiver;
        DM.ischannel = false;
        DM.salt = '';
        DM.password = '';
        DM.ispublic = false;
        await DM.save();
        return DM;
    }
    async addMember(room, creator, role) {
        const Membership = new membership_entity_1.membership();
        Membership.role = role;
        Membership.Player = creator;
        Membership.room = room;
        Membership.ismuted = false;
        Membership.isbanned = false;
        await Membership.save();
    }
    async getRoomById(id) {
        const room = await this.findOne({ id });
        return room;
    }
    async getChatroomById(id) {
        const room = await this.createQueryBuilder('room')
            .where('room.id = :id', { id })
            .select(['room.id', 'room.name', 'room.ispublic', 'room.ischannel'])
            .getOne();
        return room;
    }
};
roomRepository = __decorate([
    (0, typeorm_1.EntityRepository)(room_entity_1.chatroom)
], roomRepository);
exports.roomRepository = roomRepository;
//# sourceMappingURL=room.repository.js.map