import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DifficultService } from './difficult.service';
export declare class DifficultGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private difficultService;
    wss: Server;
    private players;
    constructor(difficultService: DifficultService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    handleKeyUpPressed(client: Socket): void;
    handleKeyDownPressed(client: Socket): void;
    handleKeyUpUnpressed(client: Socket): void;
    handleKeyDownUnpressed(client: Socket): void;
    handlTouchMove(client: Socket, data: {
        y: number;
    }): void;
}
