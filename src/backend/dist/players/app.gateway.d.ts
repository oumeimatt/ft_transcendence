/// <reference types="node" />
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'http';
import { Socket } from 'socket.io';
import { UsersService } from './players.service';
export declare class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private usersService;
    private connectedUsers;
    server: Server;
    private logger;
    constructor(usersService: UsersService);
    handleConnection(client: any): Promise<void>;
    handleDisconnect(client: Socket, ...args: any[]): void;
}
