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
exports.membership = void 0;
const player_entity_1 = require("../players/player.entity");
const typeorm_1 = require("typeorm");
const membership_model_1 = require("./dto/membership.model");
const room_entity_1 = require("./room.entity");
let membership = class membership extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], membership.prototype, "id_membership", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], membership.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'playerid' }),
    __metadata("design:type", Number)
], membership.prototype, "playerid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => player_entity_1.Player, Player => Player.memberships),
    (0, typeorm_1.JoinColumn)({ name: "playerid" }),
    __metadata("design:type", player_entity_1.Player)
], membership.prototype, "Player", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'roomid' }),
    __metadata("design:type", Number)
], membership.prototype, "roomid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => room_entity_1.room, room => room.memberships),
    (0, typeorm_1.JoinColumn)({ name: "roomid" }),
    __metadata("design:type", room_entity_1.room)
], membership.prototype, "room", void 0);
membership = __decorate([
    (0, typeorm_1.Entity)()
], membership);
exports.membership = membership;
//# sourceMappingURL=membership.entity.js.map