"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerRepository = void 0;
const avatars_1 = require("@dicebear/avatars");
const style = require("@dicebear/croodles");
const player_entity_1 = require("./player.entity");
const player_status_enum_1 = require("./player_status.enum");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let PlayerRepository = class PlayerRepository extends typeorm_1.Repository {
    async getUsers(FilterDto) {
        const { id, username, level, status } = FilterDto;
        const query = this.createQueryBuilder('user');
        if (id) {
            query.andWhere('user.id = :id', { id });
        }
        if (username) {
            query.andWhere('user.username = :username', { username });
        }
        if (level) {
            query.andWhere('user.level == :level', { level });
        }
        if (status) {
            query.andWhere('user.status = :status', { status });
        }
        const users = await query.getMany().then((user) => {
            return (user);
        });
        return users;
    }
    async signUp(createUserDto) {
        const { username, avatar } = createUserDto;
        const user = new player_entity_1.Player();
        user.username = username;
        if (avatar) {
            user.avatar = avatar;
        }
        else {
            console.log('generate random avatar ^^');
            user.avatar = (0, avatars_1.createAvatar)(style, { seed: username + '.svg' });
        }
        user.wins = 0;
        user.losses = 0;
        user.level = 0;
        user.status = player_status_enum_1.UserStatus.ONLINE;
        user.two_fa = false;
        try {
            await user.save();
        }
        catch (error) {
            console.log(error.code);
            if (error.code === '23505') {
                throw new common_1.ConflictException('Username already exists');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
};
PlayerRepository = __decorate([
    (0, typeorm_1.EntityRepository)(player_entity_1.Player)
], PlayerRepository);
exports.PlayerRepository = PlayerRepository;
//# sourceMappingURL=player.repository.js.map