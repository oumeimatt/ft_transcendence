import { Logger } from '@nestjs/common';
import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'http';
import { Socket } from 'socket.io';
import { UsersService } from './players/players.service';
import { UserStatus } from './players/player_status.enum';

@WebSocketGateway({ namespace: '/connect', cors: true })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
	
	@WebSocketServer()
	server: Server;
	private logger: Logger = new Logger('Connect Gateway');
	constructor(private usersService: UsersService) {}
	// user: number = 0;
	
	async handleConnection(client: any) {
		if (client.handshake.query.accessToken !== null) {
			try {
				const user = await this.usersService.verifyToken(client.handshake.query.accessToken as string);
				client.data.user = user;
				const found = await this.usersService.findPlayer(user.id);
				if (found) {
					this.logger.log(`User ${user.username} is already connected`);
					client.data.user = found;
					this.usersService.updateStatus(found.id, UserStatus.ONLINE);
				}
			} catch(err) {
				this.logger.error(err);
			}
		}
	}

	//& called whenever client connects to the server
	handleDisconnect(client: Socket, ...args: any[]) {
		if (client.handshake.query.accessToken !== null) {
			if (client.data.user) {
				this.logger.log(`User ${client.data.user.username} disconnected`);
				this.usersService.updateStatus(client.data.user.id, UserStatus.OFFLINE);
			}
		}
	}


	// @SubscribeMessage('event')
	// handleEvent(
	// 	client: Socket,
	// 	payload: string
	// // ): WsResponse<string> {
	// ): void {

	// 	console.log('Hi bitch !');
	// 	this.server.emit('msg', payload); //+ emit response to everyone
	// 	// return { event: 'event', data: 'Hi bitch !' };
	// }

	// @SubscribeMessage('message')
	// handleMessage(client: any, payload: any): string {
	// 	return 'Hello world!';
	// }
}