import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DifficultService } from './difficult.service';

@WebSocketGateway({ namespace: '/difficult', cors: true, path: '/game/difficult' })
export class DifficultGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  private players: Socket[];

  constructor(private difficultService: DifficultService) {
    this.players = [];
  }

  async handleConnection(client: Socket) {
    await this.difficultService.handleUserConnected(client, this.players, this.wss);
  }

  async handleDisconnect(client: Socket) {
    this.players = this.players.filter((clt) => {
      return clt.id !== client.id;
    });
    await this.difficultService.handleUserDisconnected(this.wss, client);
  }

  @SubscribeMessage('UpKeyPressed')
  handleKeyUpPressed(client: Socket /* , data: any */): void {
    if (client.data.playground) {
      this.difficultService.handleKeyUpPressed(client);
    }
  }

  @SubscribeMessage('DownKeyPressed')
  handleKeyDownPressed(client: Socket /* , data: any */) {
    if (client.data.playground) {
      this.difficultService.handleKeyDownPressed(client);
    }
  }
  @SubscribeMessage('UpKeyUnpressed')
  handleKeyUpUnpressed(client: Socket /* , data: any */) {
    if (client.data.playground) {
      this.difficultService.handleKeyUpUnpressed(client);
    }
  }

  @SubscribeMessage('DownKeyUnpressed')
  handleKeyDownUnpressed(client: Socket /* , data: any */) {
    if (client.data.playground) {
      this.difficultService.handleKeyDownUnpressed(client);
    }
  }
  @SubscribeMessage('touchMove')
  handlTouchMove(client: Socket, data: { y: number }) {
    if (client.data.playground) {
      this.difficultService.handleTouchMove(client, data);
    }
  }
}
