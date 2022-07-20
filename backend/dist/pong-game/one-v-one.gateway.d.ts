import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OneVOneService } from './one-v-one.service';
export declare class OneVOneGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private onevoneService;
    wss: Server;
    private players;
    constructor(onevoneService: OneVOneService);
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
