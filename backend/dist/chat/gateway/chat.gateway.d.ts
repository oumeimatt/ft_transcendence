import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { Player } from 'src/players/player.entity';
import { UsersService } from 'src/players/players.service';
import { ChatService } from '../chat.service';
import { messageDto } from '../dto/message-dto';
import { RoomDto } from '../dto/room-dto';
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private authService;
    private chatService;
    private userService;
    server: Server;
    user: any[];
    decoded: any;
    title: any[];
    player: Player;
    players: Player[];
    constructor(authService: AuthService, chatService: ChatService, userService: UsersService);
    afterInit(server: any): void;
    handleConnection(client: Socket): Promise<void>;
    private disconnect;
    handleDisconnect(client: any): void;
    onCreateRoom(socket: Socket, roomdto: RoomDto): Promise<void>;
    onCreateMessage(socket: Socket, messageDto: messageDto): Promise<void>;
    leaveChannel(socket: Socket, roomid: number): Promise<void>;
    joinChannel(socket: Socket, roomid: number): Promise<void>;
}
