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
exports.AppGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const http_1 = require("http");
const players_service_1 = require("./players.service");
let AppGateway = class AppGateway {
    constructor(usersService) {
        this.usersService = usersService;
        this.logger = new common_1.Logger('Connect Gateway');
        this.connectedUsers = [];
    }
    async handleConnection(client) {
        if (client.handshake.query.accessToken != 'null') {
            try {
                const user = await this.usersService.verifyToken(client.handshake.query.accessToken);
                const found = await this.usersService.findPlayer(user.id);
                if (found) {
                    this.connectedUsers.push({ playerId: found.id, clientId: client.id });
                    this.server.emit('connected', { connectedUsers: this.connectedUsers });
                }
            }
            catch (err) {
                this.logger.error(err);
            }
        }
    }
    handleDisconnect(client, ...args) {
        const user = this.connectedUsers.find(us => us.clientId === client.id);
        this.connectedUsers = this.connectedUsers.filter(us => us.clientId !== client.id);
        this.server.emit('disconnected', { connectedUsers: this.connectedUsers });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", http_1.Server)
], AppGateway.prototype, "server", void 0);
AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: '/connect', cors: true, path: '/user/connected' }),
    __metadata("design:paramtypes", [players_service_1.UsersService])
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map