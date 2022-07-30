import { Logger, OnModuleDestroy } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DefaultService } from './default.service';

@WebSocketGateway({ namespace: '/default', cors: true, path: '/game/default' })
export class DefaultGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  private players: Socket[];

  constructor(private defaultService: DefaultService) {
    this.players = [];
  }

  async handleConnection(client: Socket) {
    await this.defaultService.handleUserConnected(client, this.players, this.wss);
  }

  async handleDisconnect(client: Socket) {
    this.players = this.players.filter((clt) => {
      return clt.id !== client.id;
    });
    await this.defaultService.handleUserDisconnected(this.wss, client);
  }

  @SubscribeMessage('UpKeyPressed')
  handleKeyUpPressed(client: Socket /* , data: any */): void {
    if (client.data.playground) {
      this.defaultService.handleKeyUpPressed(client);
    }
  }

  @SubscribeMessage('DownKeyPressed')
  handleKeyDownPressed(client: Socket /* , data: any */) {
    if (client.data.playground) {
      this.defaultService.handleKeyDownPressed(client);
    }
  }
  @SubscribeMessage('UpKeyUnpressed')
  handleKeyUpUnpressed(client: Socket /* , data: any */) {
    if (client.data.playground) {
      this.defaultService.handleKeyUpUnpressed(client);
    }
  }

  @SubscribeMessage('DownKeyUnpressed')
  handleKeyDownUnpressed(client: Socket /* , data: any */) {
    if (client.data.playground) {
      this.defaultService.handleKeyDownUnpressed(client);
    }
  }
  @SubscribeMessage('touchMove')
  handlTouchMove(client: Socket, data: { y: number }) {
    if (client.data.playground) {
      this.defaultService.handleTouchMove(client, data);
    }
  }
}
