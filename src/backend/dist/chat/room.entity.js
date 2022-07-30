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
exports.chatroom = void 0;
const typeorm_1 = require("typeorm");
const message_entity_1 = require("./message.entity");
const membership_entity_1 = require("./membership.entity");
let chatroom = class chatroom extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], chatroom.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], chatroom.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], chatroom.prototype, "ischannel", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], chatroom.prototype, "ispublic", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], chatroom.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], chatroom.prototype, "salt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => membership_entity_1.membership, membership => membership.room),
    __metadata("design:type", Array)
], chatroom.prototype, "memberships", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.message, message => message.room),
    __metadata("design:type", Array)
], chatroom.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], chatroom.prototype, "create_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], chatroom.prototype, "updated_at", void 0);
chatroom = __decorate([
    (0, typeorm_1.Entity)()
], chatroom);
exports.chatroom = chatroom;
//# sourceMappingURL=room.entity.js.map