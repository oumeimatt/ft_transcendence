import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { UsersService } from 'src/players/players.service';
import { PlayGroundInterface } from './interfaces';
import { PongGameService } from './pong-game.service';
import { PlayGround } from './utils';
export declare class DifficultService {
    private pongGameService;
    private usersService;
    readonly logger: Logger;
    readonly emptyPlayground: PlayGround;
    constructor(pongGameService: PongGameService, usersService: UsersService);
    handleGetBackGround(playground: PlayGround): PlayGroundInterface;
    handleUserConnected(client: Socket, players: Socket[], wss: Server): void;
    handleSpectatorConnected(client: Socket): Promise<void>;
    handlePlayerConnected(client: Socket, players: Socket[], wss: Server): Promise<void>;
    joinPlayersToGame(first: Socket, second: Socket, wss: Server): void;
    handleUserDisconnected(wss: Server, client: Socket): Promise<void>;
    handleKeyUpPressed(client: Socket): void;
    handleKeyDownPressed(client: Socket): void;
    handleKeyUpUnpressed(client: Socket): void;
    handleKeyDownUnpressed(client: Socket): void;
    handleTouchMove(client: Socket, data: {
        y: number;
    }): void;
}
