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
        passport.authenticate('42');
        if (!req.user) {
            return 'no user from 42';
        }
        const user = req.user;
        const player = await this.playerService.findOrCreate(user.id, user.login);
        return this.cb(req, res, player);
    }
    async cb(req, res, player) {
        console.log("called");
        passport.authenticate('42', { failureRedirect: `/auth/login` });
        const id = player.id;
        const username = player.username;
        const payload = { username, id };
        const accessToken = await this.jwtService.sign(payload);
        res.cookie('connect_sid', [accessToken]);
        res.redirect('http://localhost:3000/home');
    }
    async logout(id, req, res) {
        await this.playerService.updateStatus(id, player_status_enum_1.UserStatus.OFFLINE);
        console.log('logout');
        req.logout();
        return res.redirect('http://localhost:3000/home');
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
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, player_entity_1.Player]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "cb", null);
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [players_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map