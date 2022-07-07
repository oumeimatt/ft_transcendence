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
exports.Player = void 0;
const typeorm_1 = require("typeorm");
const player_status_enum_1 = require("./player_status.enum");
const relation_entity_1 = require("../relations/relation.entity");
const membership_entity_1 = require("../chat/membership.entity");
const message_entity_1 = require("../chat/gateway/message.entity");
let Player = class Player extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Player.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Player.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Player.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Player.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Player.prototype, "wins", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Player.prototype, "losses", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: player_status_enum_1.UserStatus.ONLINE }),
    __metadata("design:type", String)
], Player.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Player.prototype, "two_fa", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => relation_entity_1.Relation, relation => relation.sender, { eager: true }),
    __metadata("design:type", Array)
], Player.prototype, "senders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => membership_entity_1.membership, membership => membership.Player),
    __metadata("design:type", Array)
], Player.prototype, "memberships", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.message, message => message.Player),
    __metadata("design:type", Array)
], Player.prototype, "messages", void 0);
Player = __decorate([
    (0, typeorm_1.Entity)('player'),
    (0, typeorm_1.Unique)(['username'])
], Player);
exports.Player = Player;
//# sourceMappingURL=player.entity.js.map