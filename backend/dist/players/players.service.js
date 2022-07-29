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
const otplib_1 = require("otplib");
const QRCode = require('qrcode');
const dotenv = require("dotenv");
dotenv.config({ path: `.env` });
let UsersService = class UsersService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async getStatusByUserId(id) {
        const user = await this.getUserById(id);
        return user.status;
    }
    async getUserById(id) {
        const found = await this.userRepository.findOne(id);
        if (!found) {
            throw new common_1.NotFoundException(`User with ID "${id}" not found`);
        }
        return found;
    }
    async getUserByUsername(username) {
        const found = await this.userRepository.findOne({ username: username });
        if (!found) {
            throw new common_1.NotFoundException(`User with ID "${username}" not found`);
        }
        return found;
    }
    async getUserByStatusId(id) {
        const found = await this.userRepository.findOne({ where: { id: id, status: player_status_enum_1.UserStatus.ONLINE } });
        if (!found) {
            throw new common_1.NotFoundException(`User with ID "${id}" not found`);
        }
        return found;
    }
    async getUsers(FilterDto) {
        return this.userRepository.getUsers(FilterDto);
    }
    async updateUsername(id, username) {
        const updated = await this.getUserById(id);
        var regEx = /^[0-9a-zA-Z]+$/;
        if (!regEx.test(username)) {
            throw new common_1.BadRequestException('Username must be alphanumeric');
        }
        updated.username = username;
        try {
            await updated.save();
        }
        catch (error) {
            console.log('updateUsername -> duplicated !! ' + error.code);
            if (error.code === '23505') {
                throw new common_1.BadRequestException('Username already exists');
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
    async updateLevel(id, difficult) {
        const updated = await this.getUserById(id);
        if (updated) {
            updated.level = updated.level + (difficult ? 0.15 : 0.10);
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
        else if (user.wins >= 1 && user.wins < 5)
            s = -1;
        else
            s = 4;
        return achievements.slice(s);
    }
    async findPlayer(id) {
        const found = await this.userRepository.findOne({ where: { id } });
        return found;
    }
    async findOrCreate(id, login) {
        const found = await this.userRepository.findOne({ where: { id } });
        if (found) {
            return found;
        }
        console.log('create new user');
        const newUser = new player_entity_1.Player();
        newUser.id = id;
        newUser.username = login;
        newUser.avatar = "https://avatars.dicebear.com/api/croodles/" + login + ".svg";
        newUser.level = 0.0;
        newUser.wins = 0;
        newUser.losses = 0;
        newUser.two_fa = false;
        try {
            await newUser.save();
        }
        catch (error) {
            console.log('findOrCreate' + error.code);
            throw new common_1.BadRequestException('error while creating user');
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
    async generateSecretQr(user) {
        const { otpauth_url } = await this.generateTwoFactorAuthenticationSecret(user);
        const imageUrl = process.cwd() + "/public/qr_" + user.id + ".png";
        const pathToServe = "qr_" + user.id + ".png";
        QRCode.toFile(imageUrl, otpauth_url.toString(), [], (err, img) => {
            if (err) {
                console.log('Error with QRcode' + err);
                return;
            }
        });
        return pathToServe;
    }
    async turnOnTwoFactorAuthentication(id) {
        await this.userRepository.update(id, { two_fa: true });
        console.log('Two factor authentication turned on');
    }
    async generateTwoFactorAuthenticationSecret(user) {
        const secret = otplib_1.authenticator.generateSecret();
        const token = otplib_1.authenticator.generate(secret);
        const otpauth_url = otplib_1.authenticator.keyuri(token, process.env.APP_NAME, secret);
        await this.userRepository.update(user.id, { secret: secret });
        return { secret, otpauth_url };
    }
    async verifyTwoFactorAuthenticationCodeValid(user, code) {
        const secret = user.secret;
        const verif = otplib_1.authenticator.verify({ token: code, secret: secret });
        console.log('verrified = ' + verif);
        return verif;
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