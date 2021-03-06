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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const player_entity_1 = require("../players/player.entity");
const players_service_1 = require("../players/players.service");
const player_status_enum_1 = require("../players/player_status.enum");
const logout = require('express-passport-logout');
const dotenv = require("dotenv");
dotenv.config({ path: `.env` });
const passport = require('passport');
const FortyTwoStrategy = require('passport-42').Strategy;
passport.use(new FortyTwoStrategy({
    clientID: process.env.UID,
    clientSecret: process.env.SECRET,
    callbackURL: process.env.CALLBACK_URL,
}, async function (accessToken, refreshToken, profile, cb) {
    const user = {
        id: profile._json.id,
        login: profile._json.login,
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
    cb(null, user);
}));
let AuthService = class AuthService {
    constructor(playerService, jwtService) {
        this.playerService = playerService;
        this.jwtService = jwtService;
    }
    async login(req, res) {
        console.log('login');
        passport.authenticate('42', { failureRedirect: "/" });
        if (!req.user) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        const user = req.user;
        const player = await this.playerService.findOrCreate(user.id, user.login);
        return this.cb(res, player);
    }
    async cb(res, player) {
        const id = player.id;
        const username = player.username;
        const two_fa = player.two_fa;
        const payload = { username, id, two_fa };
        const accessToken = await this.jwtService.sign(payload);
        if (player.two_fa == false) {
            if (player.status === player_status_enum_1.UserStatus.OFFLINE)
                this.playerService.updateStatus(id, player_status_enum_1.UserStatus.ONLINE);
            res.cookie('connect_sid', [accessToken]);
            res.redirect('http://' + process.env.FRONTEND_HOST + '/home');
        }
        else {
            console.log('two_factor authentication');
            this.playerService.updateStatus(id, player_status_enum_1.UserStatus.TWOFA);
            res.cookie('twofa', [accessToken]);
            res.redirect('http://' + process.env.FRONTEND_HOST + '/twofactorauthentication');
        }
    }
    async logout(id, res) {
        console.log('logout');
        await this.playerService.updateStatus(id, player_status_enum_1.UserStatus.OFFLINE);
        await logout();
        await res.clearCookie('connect_sid', { domain: process.env.FRONTEND_HOST, path: '/' });
        res.redirect('http://' + process.env.FRONTEND_HOST + '/home');
    }
};
__decorate([
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "login", null);
__decorate([
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, player_entity_1.Player]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "cb", null);
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [players_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map