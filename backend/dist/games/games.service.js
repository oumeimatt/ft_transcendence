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
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Player_repository_1 = require("../players/Player.repository");
const game_repository_1 = require("./game.repository");
let GameService = class GameService {
    constructor(gameRepository) {
        this.gameRepository = gameRepository;
    }
    async createGame(createMatchDto, player) {
        return this.gameRepository.createGame(createMatchDto, player);
    }
    async getGameById(id) {
        const found = await this.gameRepository.findOne(id);
        if (!found) {
            throw new common_1.NotFoundException(`Match with ID "${id}" not found`);
        }
        return found;
    }
    async getGame(FilterDto) {
        return this.gameRepository.getGame(FilterDto);
    }
    async deleteGame(id) {
        const del = await this.gameRepository.delete(id);
        if (!del.affected) {
            throw new common_1.NotFoundException(`Match with ID "${id}" not found`);
        }
    }
};
GameService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Player_repository_1.PlayerRepository)),
    __metadata("design:paramtypes", [game_repository_1.GameRepository])
], GameService);
exports.GameService = GameService;
//# sourceMappingURL=games.service.js.map