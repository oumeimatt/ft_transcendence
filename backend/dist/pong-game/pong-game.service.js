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
const game_room_entity_1 = require("./typeorm/game-room.entity");
const typeorm_2 = require("typeorm");
const game_history_entity_1 = require("./typeorm/game-history.entity");
let PongGameService = class PongGameService {
    constructor(roomRepository, gameRepository) {
        this.roomRepository = roomRepository;
        this.gameRepository = gameRepository;
    }
    async getRooms() {
        const rooms = await this.roomRepository.find();
        return { gamesRooms: rooms };
    }
    async addRoom(Createroom) {
        const { roomname, difficulty, player1, player2 } = Createroom;
        const room = new game_room_entity_1.GameRoom();
        room.roomname = roomname;
        room.difficulty = difficulty;
        room.player1 = player1;
        room.player2 = player2;
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
    async getGamesHistory(id) {
        const games = await this.gameRepository.find({
            where: {
                winner: {
                    id: id
                },
                loser: {
                    id: id
                }
            },
        });
        return { gamesHistory: games };
    }
    async addGameHistory(createGameHistoryDto) {
        const { mode, winner, loser, winnerScore, loserScore } = createGameHistoryDto;
        const gamesHistory = new game_history_entity_1.GameHistory();
        gamesHistory.mode = mode;
        gamesHistory.winner = winner;
        gamesHistory.loser = loser;
        gamesHistory.winnerScore = winnerScore;
        gamesHistory.loserScore = loserScore;
        try {
            await this.gameRepository.save(gamesHistory);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
        return gamesHistory;
    }
};
PongGameService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(game_room_entity_1.GameRoom)),
    __param(1, (0, typeorm_1.InjectRepository)(game_history_entity_1.GameHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PongGameService);
exports.PongGameService = PongGameService;
//# sourceMappingURL=pong-game.service.js.map