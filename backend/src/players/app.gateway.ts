import { Logger } from '@nestjs/common';
import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'http';
import { Socket } from 'socket.io';
import { UsersService } from './players.service';

@WebSocketGateway({ namespace: '/connect', cors: true, path: '/user/connected' })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
	
	private connectedUsers: { playerId: number, clientId: string }[];
	@WebSocketServer() server: Server;
	private logger: Logger = new Logger('Connect Gateway');
	constructor(private usersService: UsersService) {
		this.connectedUsers = [];
	}

	//& called whenever client connects to the server
	async handleConnection(client: any) {
		if (client.handshake.query.accessToken != 'null') {
			try {
				const user = await this.usersService.verifyToken(client.handshake.query.accessToken as string);
				// console.log('handle connection -> verify');
				const found = await this.usersService.findPlayer(user.id);
				if (found) {
					this.connectedUsers.push({ playerId: found.id , clientId: client.id });
					this.server.emit('connected', { connectedUsers: this.connectedUsers });
				}
			} catch(err) {
				this.logger.error(err);
			}
		}
	}

	handleDisconnect(client: Socket, ...args: any[]) {
		const user = this.connectedUsers.find(us => us.clientId === client.id);
		//console.log('handle disconnect ' + user.playerId + '  -  ' + user.clientId);
		this.connectedUsers = this.connectedUsers.filter(us => us.clientId !== client.id);
		this.server.emit('connected', { connectedUsers: this.connectedUsers });
	}
}