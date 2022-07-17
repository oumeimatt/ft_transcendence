import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DefaultService } from './default.service';
export declare class DefaultGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private defaultService;
    wss: Server;
    readonly logger: any;
    private players;
    constructor(defaultService: DefaultService);
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
