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
exports.OneVOneGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const one_v_one_service_1 = require("./one-v-one.service");
let OneVOneGateway = class OneVOneGateway {
    constructor(onevoneService) {
        this.onevoneService = onevoneService;
        this.logger = new common_1.Logger('OneVOne PongGame Server: ');
        this.players = [];
    }
    handleConnection(client) {
        this.logger.log(client.id + ' Connected!');
        this.onevoneService.handleUserConnected(client, this.players, this.wss);
    }
    handleDisconnect(client) {
        this.logger.log(client.id + ' Disconnected!');
        this.players = this.players.filter((clt) => {
            return clt.id !== client.id;
        });
        this.onevoneService.handleUserDisconnected(this.wss, client);
    }
    handleKeyUpPressed(client) {
        if (client.data.playground) {
            this.onevoneService.handleKeyUpPressed(client);
        }
    }
    handleKeyDownPressed(client) {
        if (client.data.playground) {
            this.onevoneService.handleKeyDownPressed(client);
        }
    }
    handleKeyUpUnpressed(client) {
        if (client.data.playground) {
            this.onevoneService.handleKeyUpUnpressed(client);
        }
    }
    handleKeyDownUnpressed(client) {
        if (client.data.playground) {
            this.onevoneService.handleKeyDownUnpressed(client);
        }
    }
    handlTouchMove(client, data) {
        if (client.data.playground) {
            this.onevoneService.handleTouchMove(client, data);
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], OneVOneGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('UpKeyPressed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], OneVOneGateway.prototype, "handleKeyUpPressed", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('DownKeyPressed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], OneVOneGateway.prototype, "handleKeyDownPressed", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('UpKeyUnpressed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], OneVOneGateway.prototype, "handleKeyUpUnpressed", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('DownKeyUnpressed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], OneVOneGateway.prototype, "handleKeyDownUnpressed", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('touchMove'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], OneVOneGateway.prototype, "handlTouchMove", null);
OneVOneGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: '/oneVone', cors: true }),
    __metadata("design:paramtypes", [one_v_one_service_1.OneVOneService])
], OneVOneGateway);
exports.OneVOneGateway = OneVOneGateway;
//# sourceMappingURL=one-v-one.gateway.js.map