import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DifficultService } from './difficult.service';
export declare class DifficultGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private difficultService;
    wss: Server;
    readonly logger: Logger;
    private players;
    constructor(difficultService: DifficultService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleKeyUpPressed(client: Socket): void;
    handleKeyDownPressed(client: Socket): void;
    handleKeyUpUnpressed(client: Socket): void;
    handleKeyDownUnpressed(client: Socket): void;
    handlTouchMove(client: Socket, data: {
        y: number;
    }): void;
}
