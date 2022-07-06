"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerModule = void 0;
const common_1 = require("@nestjs/common");
const players_controller_1 = require("./players.controller");
const players_service_1 = require("./players.service");
const typeorm_1 = require("@nestjs/typeorm");
const player_repository_1 = require("./player.repository");
const relations_module_1 = require("../relations/relations.module");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("../auth/jwt.strategy");
const relation_repository_1 = require("../relations/relation.repository");
let PlayerModule = class PlayerModule {
};
PlayerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: 'pingpong',
                signOptions: {
                    expiresIn: '1d',
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([player_repository_1.PlayerRepository]),
            typeorm_1.TypeOrmModule.forFeature([relation_repository_1.RelationRepository]),
            relations_module_1.RelationModule,
        ],
        controllers: [players_controller_1.UsersController],
        providers: [
            players_service_1.UsersService,
            jwt_strategy_1.JwtStrategy,
        ],
        exports: [players_service_1.UsersService],
    })
], PlayerModule);
exports.PlayerModule = PlayerModule;
//# sourceMappingURL=players.module.js.map