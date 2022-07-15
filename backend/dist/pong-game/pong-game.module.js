"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PongGameModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const default_gateway_1 = require("./default.gateway");
const default_service_1 = require("./default.service");
const difficult_gateway_1 = require("./difficult.gateway");
const difficult_service_1 = require("./difficult.service");
const pong_game_controller_1 = require("./pong-game.controller");
const pong_game_service_1 = require("./pong-game.service");
const room_entity_1 = require("./typeorm/room.entity");
const one_v_one_service_1 = require("./one-v-one.service");
let PongGameModule = class PongGameModule {
};
PongGameModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([room_entity_1.Room])],
        controllers: [pong_game_controller_1.PongGameController],
        providers: [
            pong_game_service_1.PongGameService,
            default_gateway_1.DefaultGateway,
            difficult_gateway_1.DifficultGateway,
            default_service_1.DefaultService,
            difficult_service_1.DifficultService,
            one_v_one_service_1.OneVOneService,
        ],
    })
], PongGameModule);
exports.PongGameModule = PongGameModule;
//# sourceMappingURL=pong-game.module.js.map