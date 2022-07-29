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
exports.CreateGameHistoryDto = void 0;
const class_validator_1 = require("class-validator");
const player_entity_1 = require("../../players/player.entity");
const interfaces_1 = require("../interfaces");
class CreateGameHistoryDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)([interfaces_1.GameMood.DEFAULT, interfaces_1.GameMood.DIFFICULT, interfaces_1.GameMood.ONEVONE]),
    __metadata("design:type", String)
], CreateGameHistoryDto.prototype, "mode", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", player_entity_1.Player)
], CreateGameHistoryDto.prototype, "winner", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", player_entity_1.Player)
], CreateGameHistoryDto.prototype, "loser", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateGameHistoryDto.prototype, "winnerScore", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateGameHistoryDto.prototype, "loserScore", void 0);
exports.CreateGameHistoryDto = CreateGameHistoryDto;
//# sourceMappingURL=createGameHistory.dto.js.map