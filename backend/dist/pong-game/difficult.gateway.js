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
exports.DifficultGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const difficult_service_1 = require("./difficult.service");
let DifficultGateway = class DifficultGateway {
    constructor(difficultService) {
        this.difficultService = difficultService;
        this.players = [];
    }
    handleConnection(client) {
        this.difficultService.handleUserConnected(client, this.players, this.wss);
    }
    handleDisconnect(client) {
        this.players = this.players.filter((clt) => {
            return clt.id !== client.id;
        });
        this.difficultService.handleUserDisconnected(this.wss, client);
    }
    handleKeyUpPressed(client) {
        if (client.data.playground) {
            this.difficultService.handleKeyUpPressed(client);
        }
    }
    handleKeyDownPressed(client) {
        if (client.data.playground) {
            this.difficultService.handleKeyDownPressed(client);
        }
    }
    handleKeyUpUnpressed(client) {
        if (client.data.playground) {
            this.difficultService.handleKeyUpUnpressed(client);
        }
    }
    handleKeyDownUnpressed(client) {
        if (client.data.playground) {
            this.difficultService.handleKeyDownUnpressed(client);
        }
    }
    handlTouchMove(client, data) {
        if (client.data.playground) {
            this.difficultService.handleTouchMove(client, data);
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], DifficultGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('UpKeyPressed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], DifficultGateway.prototype, "handleKeyUpPressed", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('DownKeyPressed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], DifficultGateway.prototype, "handleKeyDownPressed", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('UpKeyUnpressed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], DifficultGateway.prototype, "handleKeyUpUnpressed", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('DownKeyUnpressed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], DifficultGateway.prototype, "handleKeyDownUnpressed", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('touchMove'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], DifficultGateway.prototype, "handlTouchMove", null);
DifficultGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: '/difficult', cors: true }),
    __metadata("design:paramtypes", [difficult_service_1.DifficultService])
], DifficultGateway);
exports.DifficultGateway = DifficultGateway;
//# sourceMappingURL=difficult.gateway.js.map