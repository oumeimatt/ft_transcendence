import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OneVOneService } from './one-v-one.service';

@WebSocketGateway({ namespace: '/oneVone', cors: true })
export class OneVOneGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  private players: Socket[];

  constructor(private onevoneService: OneVOneService) {
    this.players = [];
  }
  
  handleConnection(client: Socket) {
    this.onevoneService.handleUserConnected(client, this.players, this.wss);
  }

  handleDisconnect(client: Socket) {
    this.players = this.players.filter((clt) => {
      return clt.id !== client.id;
    });
    this.onevoneService.handleUserDisconnected(this.wss, client);
  }

  @SubscribeMessage('UpKeyPressed')
  handleKeyUpPressed(client: Socket /* , data: any */): void {
    if (client.data.playground) {
      this.onevoneService.handleKeyUpPressed(client);
    }
  }

  @SubscribeMessage('DownKeyPressed')
  handleKeyDownPressed(client: Socket /* , data: any */) {
    if (client.data.playground) {
      this.onevoneService.handleKeyDownPressed(client);
    }
  }
  @SubscribeMessage('UpKeyUnpressed')
  handleKeyUpUnpressed(client: Socket /* , data: any */) {
    if (client.data.playground) {
      this.onevoneService.handleKeyUpUnpressed(client);
    }
  }

  @SubscribeMessage('DownKeyUnpressed')
  handleKeyDownUnpressed(client: Socket /* , data: any */) {
    if (client.data.playground) {
      this.onevoneService.handleKeyDownUnpressed(client);
    }
  }
  @SubscribeMessage('touchMove')
  handlTouchMove(client: Socket, data: { y: number }) {
    if (client.data.playground) {
      this.onevoneService.handleTouchMove(client, data);
    }
  }
}
