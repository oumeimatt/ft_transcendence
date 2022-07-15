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
exports.PongGameController = void 0;
const common_1 = require("@nestjs/common");
const pong_game_service_1 = require("./pong-game.service");
let PongGameController = class PongGameController {
    constructor(pongGameService) {
        this.pongGameService = pongGameService;
    }
    getRooms() {
        return this.pongGameService.getRooms();
    }
};
__decorate([
    (0, common_1.Get)('/rooms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PongGameController.prototype, "getRooms", null);
PongGameController = __decorate([
    (0, common_1.Controller)('pong-game'),
    __metadata("design:paramtypes", [pong_game_service_1.PongGameService])
], PongGameController);
exports.PongGameController = PongGameController;
//# sourceMappingURL=pong-game.controller.js.map