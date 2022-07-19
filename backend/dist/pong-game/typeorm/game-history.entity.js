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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameHistory = void 0;
const typeorm_1 = require("typeorm");
const player_entity_1 = require("../../players/player.entity");
let GameHistory = class GameHistory {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], GameHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GameHistory.prototype, "mode", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => player_entity_1.Player),
    __metadata("design:type", player_entity_1.Player)
], GameHistory.prototype, "winner", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => player_entity_1.Player),
    __metadata("design:type", player_entity_1.Player)
], GameHistory.prototype, "loser", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], GameHistory.prototype, "winnerScore", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], GameHistory.prototype, "loserScore", void 0);
GameHistory = __decorate([
    (0, typeorm_1.Entity)()
], GameHistory);
exports.GameHistory = GameHistory;
//# sourceMappingURL=game-history.entity.js.map