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
exports.Relation = void 0;
const typeorm_1 = require("typeorm");
const player_entity_1 = require("../players/player.entity");
const relation_status_enum_1 = require("./relation_status.enum");
let Relation = class Relation extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Relation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Relation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => player_entity_1.Player, player => player.receivers),
    __metadata("design:type", player_entity_1.Player)
], Relation.prototype, "receiver", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => player_entity_1.Player, player => player.senders),
    __metadata("design:type", player_entity_1.Player)
], Relation.prototype, "sender", void 0);
Relation = __decorate([
    (0, typeorm_1.Entity)('relation')
], Relation);
exports.Relation = Relation;
//# sourceMappingURL=relation.entity.js.map