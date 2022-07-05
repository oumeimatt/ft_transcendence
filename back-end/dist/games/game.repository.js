"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRepository = void 0;
const typeorm_1 = require("typeorm");
const game_entity_1 = require("./game.entity");
const game_status_enum_1 = require("./game_status.enum");
let GameRepository = class GameRepository extends typeorm_1.Repository {
    async getGame(FilterDto) {
        const { id, user1, winner, status } = FilterDto;
        const query = this.createQueryBuilder('game');
        if (id) {
            query.andWhere('match.id = :id', { id });
        }
        if (user1) {
            query.andWhere('match.user1 = :user1', { user1 });
        }
        if (winner) {
            query.andWhere('match.winner = :winner', { winner });
        }
        if (status) {
            query.andWhere('match.status = :status', { status });
        }
        const games = await query.getMany();
        return games;
    }
    async createGame(createGameDto, player) {
        const game = new game_entity_1.Game();
        game.status = game_status_enum_1.GameStatus.GAMEOVER;
        await game.save();
        return game;
    }
};
GameRepository = __decorate([
    (0, typeorm_1.EntityRepository)(game_entity_1.Game)
], GameRepository);
exports.GameRepository = GameRepository;
//# sourceMappingURL=game.repository.js.map