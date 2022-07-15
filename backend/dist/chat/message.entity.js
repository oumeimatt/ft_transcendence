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
exports.message = void 0;
const player_entity_1 = require("../players/player.entity");
const typeorm_1 = require("typeorm");
const room_entity_1 = require("./room.entity");
let message = class message extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], message.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], message.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], message.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'playerid' }),
    __metadata("design:type", Number)
], message.prototype, "playerid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'roomid' }),
    __metadata("design:type", Number)
], message.prototype, "roomid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => room_entity_1.chatroom, room => room.messages),
    (0, typeorm_1.JoinColumn)({ name: "roomid" }),
    __metadata("design:type", room_entity_1.chatroom)
], message.prototype, "room", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => player_entity_1.Player, player => player.messages),
    (0, typeorm_1.JoinColumn)({ name: "playerid" }),
    __metadata("design:type", player_entity_1.Player)
], message.prototype, "Player", void 0);
message = __decorate([
    (0, typeorm_1.Entity)()
], message);
exports.message = message;
//# sourceMappingURL=message.entity.js.map