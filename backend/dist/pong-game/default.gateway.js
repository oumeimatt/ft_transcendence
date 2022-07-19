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
exports.DefaultGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const default_service_1 = require("./default.service");
let DefaultGateway = class DefaultGateway {
    constructor(defaultService) {
        this.defaultService = defaultService;
        this.players = [];
    }
    handleConnection(client) {
        this.defaultService.handleUserConnected(client, this.players, this.wss);
    }
    handleDisconnect(client) {
        this.players = this.players.filter((clt) => {
            return clt.id !== client.id;
        });
        this.defaultService.handleUserDisconnected(this.wss, client);
    }
    handleKeyUpPressed(client) {
        if (client.data.playground) {
            this.defaultService.handleKeyUpPressed(client);
        }
    }
    handleKeyDownPressed(client) {
        if (client.data.playground) {
            this.defaultService.handleKeyDownPressed(client);
        }
    }
    handleKeyUpUnpressed(client) {
        if (client.data.playground) {
            this.defaultService.handleKeyUpUnpressed(client);
        }
    }
    handleKeyDownUnpressed(client) {
        if (client.data.playground) {
            this.defaultService.handleKeyDownUnpressed(client);
        }
    }
    handlTouchMove(client, data) {
        if (client.data.playground) {
            this.defaultService.handleTouchMove(client, data);
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], DefaultGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('UpKeyPressed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], DefaultGateway.prototype, "handleKeyUpPressed", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('DownKeyPressed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], DefaultGateway.prototype, "handleKeyDownPressed", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('UpKeyUnpressed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], DefaultGateway.prototype, "handleKeyUpUnpressed", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('DownKeyUnpressed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], DefaultGateway.prototype, "handleKeyDownUnpressed", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('touchMove'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], DefaultGateway.prototype, "handlTouchMove", null);
DefaultGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: '/default', cors: true }),
    __metadata("design:paramtypes", [default_service_1.DefaultService])
], DefaultGateway);
exports.DefaultGateway = DefaultGateway;
//# sourceMappingURL=default.gateway.js.map