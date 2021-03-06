import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DefaultService } from './default.service';
export declare class DefaultGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private defaultService;
    wss: Server;
    private players;
    constructor(defaultService: DefaultService);
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
