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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const player_entity_1 = require("./player.entity");
const player_repository_1 = require("./player.repository");
const player_status_enum_1 = require("./player_status.enum");
let UsersService = class UsersService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async getUserById(id) {
        const found = await this.userRepository.findOne(id);
        if (!found) {
            throw new common_1.NotFoundException(`User with ID "${id}" not found`);
        }
        return found;
    }
    async getUserByUsername(username) {
        const found = await this.userRepository.findOne(username);
        if (!found) {
            throw new common_1.NotFoundException(`User with ID "${username}" not found`);
        }
        return found;
    }
    async getUsers(FilterDto) {
        return this.userRepository.getUsers(FilterDto);
    }
    async updateUsername(id, username) {
        const updated = await this.getUserById(id);
        updated.username = username;
        try {
            await updated.save();
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
        return updated;
    }
    async updateAvatar(id, avatar) {
        const updated = await this.getUserById(id);
        updated.avatar = avatar;
        await updated.save();
        return updated;
    }
    async updateTwoFa(id) {
        const updated = await this.getUserById(id);
        updated.two_fa = true;
        await updated.save();
        return updated;
    }
    async updateLevel(id) {
        const updated = await this.getUserById(id);
        if (updated) {
            console.log(updated.level);
            updated.level = updated.level + 0.10;
            await updated.save();
        }
        return updated;
    }
    async winsGame(id) {
        const updated = await this.getUserById(id);
        if (updated) {
            updated.wins++;
            await updated.save();
        }
        return updated;
    }
    async LostGame(id) {
        const updated = await this.getUserById(id);
        if (updated) {
            updated.losses++;
            await updated.save();
        }
        return updated;
    }
    async updateStatus(id, status) {
        const updated = await this.getUserById(id);
        if (updated) {
            updated.status = status;
            await updated.save();
        }
        return updated;
    }
    async getAchievements(id) {
        const achievements = ['gold', 'silver', 'bronze', 'first'];
        const user = await this.userRepository.findOne(id);
        let s = 0;
        if (user.wins >= 20)
            s = -4;
        else if (user.wins >= 10)
            s = -3;
        else if (user.wins >= 5)
            s = -2;
        else if (user.wins == 1)
            s = -1;
        else
            s = 4;
        return achievements.slice(s);
    }
    async findOrCreate(id, login) {
        console.log("find or create > number of arguments passed: ", arguments.length);
        console.log(id, login);
        const found = await this.userRepository.findOne({ where: { id } });
        if (found) {
            console.log('found !!');
            found.status = player_status_enum_1.UserStatus.ONLINE;
            await found.save();
            return found;
        }
        console.log('not found !!');
        const newUser = new player_entity_1.Player();
        newUser.id = id;
        newUser.username = login;
        newUser.avatar = "https://avatars.dicebear.com/api/croodles/" + login + ".svg";
        newUser.level = 0.0;
        newUser.wins = 0;
        newUser.losses = 0;
        newUser.status = player_status_enum_1.UserStatus.ONLINE;
        newUser.two_fa = false;
        await newUser.save();
        console.log('new User saved successfully ' + newUser);
        if (typeof (newUser) == 'undefined') {
            console.log('newUser is undefined');
        }
        return newUser;
    }
    async verifyToken(token) {
        try {
            const decoded = await this.jwtService.verify(token.toString());
            if (typeof decoded === 'object' && 'id' in decoded)
                return decoded;
            throw new common_1.BadRequestException();
        }
        catch (error) {
            throw new common_1.BadRequestException('Token expired');
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_repository_1.PlayerRepository)),
    __metadata("design:paramtypes", [player_repository_1.PlayerRepository,
        jwt_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=players.service.js.map