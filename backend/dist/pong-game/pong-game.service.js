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
exports.PongGameService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const room_entity_1 = require("./typeorm/room.entity");
const typeorm_2 = require("typeorm");
let PongGameService = class PongGameService {
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }
    async getRooms() {
        const rooms = await this.roomRepository.find();
        return { rooms: rooms };
    }
    async addRoom(Createroom) {
        const { roomname, difficulty } = Createroom;
        const room = new room_entity_1.Room();
        room.roomname = roomname;
        room.difficulty = difficulty;
        try {
            await this.roomRepository.save(room);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
        return room;
    }
    async deleteRoom(roomname) {
        await this.roomRepository.delete({ roomname: roomname });
    }
};
PongGameService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(room_entity_1.Room)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PongGameService);
exports.PongGameService = PongGameService;
//# sourceMappingURL=pong-game.service.js.map