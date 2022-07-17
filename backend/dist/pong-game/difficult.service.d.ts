import { Server, Socket } from 'socket.io';
import { PlayGroundInterface } from './interfaces';
import { PongGameService } from './pong-game.service';
import { PlayGround } from './utils';
export declare class DifficultService {
    private pongGameService;
    readonly logger: any;
    readonly emptyPlayground: PlayGround;
    constructor(pongGameService: PongGameService);
    handleGetBackGround(playground: PlayGround): PlayGroundInterface;
    handleUserConnected(client: Socket, players: Socket[], wss: Server): void;
    handleSpectatorConnected(client: Socket): Promise<void>;
    handlePlayerConnected(client: Socket, players: Socket[], wss: Server): Promise<void>;
    handleUserDisconnected(wss: Server, client: Socket): void;
    handleKeyUpPressed(client: Socket): void;
    handleKeyDownPressed(client: Socket): void;
    handleKeyUpUnpressed(client: Socket): void;
    handleKeyDownUnpressed(client: Socket): void;
    handleTouchMove(client: Socket, data: {
        y: number;
    }): void;
}
