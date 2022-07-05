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
exports.GameController = void 0;
const common_1 = require("@nestjs/common");
const get_player_decorator_1 = require("../players/get-player.decorator");
const player_entity_1 = require("../players/player.entity");
const create_game_dto_1 = require("./dto-game/create-game.dto");
const get_game_filter_dto_1 = require("./dto-game/get-game-filter.dto");
const games_service_1 = require("./games.service");
let GameController = class GameController {
    constructor(gameService) {
        this.gameService = gameService;
    }
    getGames(FilterDto) {
        return this.gameService.getGame(FilterDto);
    }
    getGameById(id) {
        return this.gameService.getGameById(id);
    }
    addGame(createGameDto, player) {
        return this.gameService.createGame(createGameDto, player);
    }
    deleteGame(id) {
        return this.gameService.deleteGame(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_game_filter_dto_1.GetGameFilterDto]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "getGames", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "getGameById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_player_decorator_1.GetPlayer)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_game_dto_1.CreateGameDto,
        player_entity_1.Player]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "addGame", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "deleteGame", null);
GameController = __decorate([
    (0, common_1.Controller)('play'),
    __metadata("design:paramtypes", [games_service_1.GameService])
], GameController);
exports.GameController = GameController;
//# sourceMappingURL=games.controller.js.map