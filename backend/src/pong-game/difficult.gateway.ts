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

@WebSocketGateway({ namespace: '/difficult', cors: true })
export class DifficultGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  readonly logger = new Logger('Difficult PongGame Server: ');
  private players: Socket[];

  constructor(private difficultService: DifficultService) {
    this.players = [];
  }

  handleConnection(client: Socket) {
    this.logger.log(client.id + ' Connected!');
    // console.log(client.handshake.auth);
    // console.log(client.handshake.query);
    this.difficultService.handleUserConnected(client, this.players, this.wss);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(client.id + ' Disconnected!');
    this.players = this.players.filter((clt) => {
      return clt.id !== client.id;
    });
    this.difficultService.handleUserDisconnected(this.wss, client);
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
