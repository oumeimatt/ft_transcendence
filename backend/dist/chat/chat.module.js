"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chat_gateway_1 = require("./chat.gateway");
const room_repository_1 = require("./room.repository");
const chat_service_1 = require("./chat.service");
const auth_module_1 = require("../auth/auth.module");
const chat_controller_1 = require("./chat.controller");
const membership_entity_1 = require("./membership.entity");
const message_entity_1 = require("./message.entity");
const player_repository_1 = require("../players/player.repository");
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, typeorm_1.TypeOrmModule.forFeature([room_repository_1.roomRepository, player_repository_1.PlayerRepository, membership_entity_1.membership, message_entity_1.message]),],
        providers: [chat_gateway_1.ChatGateway, chat_service_1.ChatService],
        controllers: [chat_controller_1.ChatController],
    })
], ChatModule);
exports.ChatModule = ChatModule;
//# sourceMappingURL=chat.module.js.map