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
exports.DifficultService = void 0;
const common_1 = require("@nestjs/common");
const pong_game_service_1 = require("./pong-game.service");
const utils_1 = require("./utils");
let DifficultService = class DifficultService {
    constructor(pongGameService) {
        this.pongGameService = pongGameService;
        this.logger = new common_1.Logger('Difficult PongGame Service: ');
        this.emptyPlayground = new utils_1.PlayGround(0, 0, 800, 600, 'green', 9, true);
    }
    handleGetBackGround(playground) {
        return playground.getPlayGroundInterface();
    }
    handleUserConnected(client, players, wss) {
        if (client.handshake.query.role === 'player') {
            this.handlePlayerConnected(client, players, wss);
        }
        else if (client.handshake.query.role === 'spectator') {
            this.handleSpectatorConnected(client);
        }
    }
    async handleSpectatorConnected(client) {
        const { rooms } = await this.pongGameService.getRooms();
        const roomname = client.handshake.query.roomname;
        const found = rooms.find(room => room.roomname == roomname);
        if (found) {
            client.join(roomname);
        }
        else {
            client.emit('roomnotfound', {
                message: 'No such a Room',
            });
        }
    }
    async handlePlayerConnected(client, players, wss) {
        const found = players.find(player => player.handshake.query.username === client.handshake.query.username);
        if (found) {
            client.emit('alreadyInGame', {
                player: client.handshake.query.username,
                message: 'You Are Already in a Game',
            });
        }
        else {
            players.push(client);
            if (players.length === 1) {
                client.data.side = 'left';
                client.data.role = 'player';
                client.emit('WaitingForPlayer', {
                    player: client.handshake.query.username,
                    message: 'Waiting For Second Player',
                    playground: this.emptyPlayground.getPlayGroundInterface(),
                });
            }
            else {
                client.data.side = 'right';
                client.data.role = 'player';
                const second = players.pop();
                const first = players.pop();
                const roomname = first.id + '+' + second.id;
                first.join(roomname);
                second.join(roomname);
                first.data.roomname = roomname;
                second.data.roomname = roomname;
                this.pongGameService.addRoom({
                    roomname, difficulty: 'difficult', player1: first.handshake.query.username,
                    player2: second.handshake.query.username
                });
                const playground = new utils_1.PlayGround(0, 0, 800, 600, 'green', 9, true);
                first.data.playground = playground;
                second.data.playground = playground;
                const timer = setInterval(() => {
                    if (playground.update() == false) {
                        const pgi = this.handleGetBackGround(playground);
                        wss
                            .to(roomname)
                            .emit('updatePlayground', { name: roomname, playground: pgi });
                    }
                    else {
                        clearInterval(timer);
                        clearInterval(first.data.gameInterval);
                        this.logger.log('Game in room ' + roomname + ' Finished');
                        this.pongGameService.deleteRoom(client.data.roomname);
                    }
                }, (1.0 / 60) * 1000);
                first.data.gameInterval = timer;
                second.data.gameInterval = timer;
            }
        }
    }
    handleUserDisconnected(wss, client) {
        if (client.handshake.query.role === 'player' && client.data.gameInterval) {
            client.data.playground.ball.reset(client.data.playground.width / 2, client.data.playground.height / 2);
            client.data.playground.leftPaddle.reset();
            client.data.playground.rightPaddle.reset();
            wss.to(client.data.roomname).emit('gameInterrupted', {
                playground: this.handleGetBackGround(client.data.playground),
            });
            client.leave(client.data.roomname);
            this.pongGameService.deleteRoom(client.data.roomname);
            this.logger.log('Game Interval Cleared');
            clearInterval(client.data.gameInterval);
        }
        else if (client.handshake.query.role === 'spectator') {
            client.leave(client.handshake.query.room);
        }
    }
    handleKeyUpPressed(client) {
        if (client.data.side === 'left') {
            client.data.playground.leftPaddleController.keyUpPressed();
        }
        else if (client.data.side === 'right') {
            client.data.playground.rightPaddleController.keyUpPressed();
        }
    }
    handleKeyDownPressed(client) {
        if (client.data.side === 'left') {
            client.data.playground.leftPaddleController.keyDownPressed();
        }
        else if (client.data.side === 'right') {
            client.data.playground.rightPaddleController.keyDownPressed();
        }
    }
    handleKeyUpUnpressed(client) {
        if (client.data.side === 'left') {
            client.data.playground.leftPaddleController.keyUpUnpressed();
        }
        else if (client.data.side === 'right') {
            client.data.playground.rightPaddleController.keyUpUnpressed();
        }
    }
    handleKeyDownUnpressed(client) {
        if (client.data.side === 'left') {
            client.data.playground.leftPaddleController.keyDownUnpressed();
        }
        else if (client.data.side === 'right') {
            client.data.playground.rightPaddleController.keyDownUnpressed();
        }
    }
    handleTouchMove(client, data) {
        if (client.data.side === 'left') {
            client.data.playground.leftPaddle.touchMove(data.y, client.data.playground.bounds);
        }
        else if (client.data.side === 'right') {
            client.data.playground.rightPaddle.touchMove(data.y, client.data.playground.bounds);
        }
    }
};
DifficultService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pong_game_service_1.PongGameService])
], DifficultService);
exports.DifficultService = DifficultService;
//# sourceMappingURL=difficult.service.js.map