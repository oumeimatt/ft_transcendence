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
import { Player } from './player.entity';
import { UsersService } from './players.service';
import { UserStatus } from './player_status.enum';

@WebSocketGateway({ namespace: '/connect', cors: true, path: '/user/connected' })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
	
	private connectedUsers: { playerId: number, clientId: string }[];
	@WebSocketServer()
	server: Server;
	private logger: Logger = new Logger('Connect Gateway');
	constructor(private usersService: UsersService) {
		this.connectedUsers = [];
	}
	// user: number = 0;
	
	async handleConnection(client: any) {
		if (client.handshake.query.accessToken != 'null') {
			try {
				const user = await this.usersService.verifyToken(client.handshake.query.accessToken as string);
				const found = await this.usersService.findPlayer(user.id);
				if (found) {
					this.connectedUsers.push({ playerId: found.id , clientId: client.id });
					console.log("Connected", client.id, found.username);
					client.emit('connected', { clientId: client.id, PlayreId: found.id })
				}
			} catch(err) {
				this.logger.error(err);
			}
		}
	}

	//& called whenever client connects to the server
	handleDisconnect(client: Socket, ...args: any[]) {
		const user = this.connectedUsers.find(us => us.clientId === client.id);
		console.log(user);
		this.connectedUsers = this.connectedUsers.filter(us => us.clientId !== client.id);
		const found = this.connectedUsers.find(us => us.playerId === user.playerId);
		// if (!found)
		// 	await this.usersService.updateStatus(user.playerId, UserStatus.OFFLINE);
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