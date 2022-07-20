import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { PlayGroundInterface } from './interfaces';
import { PongGameService } from './pong-game.service';
import { PlayGround } from './utils';

@Injectable()
export class OneVOneService {
  readonly logger = new Logger('OneVOne PongGame Service: ');
  readonly emptyPlayground = new PlayGround(0, 0, 800, 600, 'black', 9, false);
  constructor(private pongGameService: PongGameService) {}
  handleGetBackGround(playground: PlayGround): PlayGroundInterface {
    return playground.getPlayGroundInterface();
  }

  handleUserConnected(client: Socket, players: Socket[], wss: Server): void {
    // if the connected is a player add him to list of players
    if (client.handshake.query.role === 'player') {
      this.handlePlayerConnected(client, players, wss);
    } else if (client.handshake.query.role === 'spectator') {
      this.handleSpectatorConnected(client);
    }
  }

  // function handles when Spectator is connected to the oneVone gateway
  async handleSpectatorConnected(client: Socket): Promise<void> {
    const { gamesRooms } = await this.pongGameService.getRooms();
    const roomname = client.handshake.query.roomname;
    const found = gamesRooms.find(room => room.roomname == roomname);
    // if (rooms.length > 0) {
    //   client.join(rooms[0].roomname);
    // }
    if (found) {
      client.join(roomname);
    } else {
      client.emit('roomnotfound', {
        message: 'No such a Room',
      });
    }
  }

  // function handles when player is connected to the oneVone gateway
  async handlePlayerConnected(client: Socket, players: Socket[], wss: Server) {
    const found = players.find(player => player.handshake.query.username === client.handshake.query.username);
    if (found) {
      client.emit('alreadyInGame', {
        player: client.handshake.query.username,
        message: 'You Are Already in a Game',
      });
    }
    else {
      const first = players.find(player => player.handshake.query.against === client.handshake.query.username);
      if (!first) {
        // if he inters first keep him waiting
        players.push(client);
        client.data.side = 'left';
        client.data.role = 'player';
        client.emit('WaitingForPlayer', {
          player: client.handshake.query.username,
          message: 'Waiting For Second Player',
          playground: this.emptyPlayground.getPlayGroundInterface(),
        });
      }
      else {
        // if another player is waiting  Start the game
        client.data.side = 'right';
        client.data.role = 'player';
        const second = client;
        const roomname = first.id + '+' + second.id;
        // join players to room
        first.join(roomname);
        second.join(roomname);
        first.data.roomname = roomname;
        second.data.roomname = roomname;
        // push room to database
        // this.pongGameService.addRoom({ roomname, difficulty: 'oneVone' });
        // create a playground for players
        const playground = new PlayGround(0, 0, 800, 600, 'black', 9, false);
        first.data.playground = playground;
        second.data.playground = playground;
        const timer = setInterval(() => {
          if (playground.update(/* roomname, wss */) == false) {
            // get interface to send to frontend
            const pgi = this.handleGetBackGround(playground);
            // broadcast game to players in room
            wss
              .to(roomname)
              .emit('updatePlayground', { name: roomname, playground: pgi });
          } else {
            // game finished
            clearInterval(timer);
            clearInterval(first.data.gameInterval);
            this.logger.log('Game in room ' + roomname + ' Finished');
            // delete room from database
            this.pongGameService.deleteRoom(client.data.roomname);
          }
        }, (1.0 / 60) * 1000);
        first.data.gameInterval = timer;
        second.data.gameInterval = timer;
      }
    }
  }

  handleUserDisconnected(wss: Server, client: Socket) {
    if (client.handshake.query.role === 'player' && client.data.gameInterval) {
      client.data.playground.ball.reset(
        client.data.playground.width / 2,
        client.data.playground.height / 2,
      );
      client.data.playground.leftPaddle.reset();
      client.data.playground.rightPaddle.reset();
      wss.to(client.data.roomname).emit('gameInterrupted', {
        playground: this.handleGetBackGround(client.data.playground),
      });
      // client left room
      client.leave(client.data.roomname);
      // delete room from database
      this.pongGameService.deleteRoom(client.data.roomname);
      clearInterval(client.data.gameInterval);
      this.logger.log('Game Interval Cleared');
    } else if (client.handshake.query.role === 'spectator') {
      client.leave(client.handshake.query.room as string);
    }
  }

  handleKeyUpPressed(client: Socket): void {
    if (client.data.side === 'left') {
      client.data.playground.leftPaddleController.keyUpPressed();
    } else if (client.data.side === 'right') {
      client.data.playground.rightPaddleController.keyUpPressed();
    }
  }

  handleKeyDownPressed(client: Socket): void {
    if (client.data.side === 'left') {
      client.data.playground.leftPaddleController.keyDownPressed();
    } else if (client.data.side === 'right') {
      client.data.playground.rightPaddleController.keyDownPressed();
    }
  }

  handleKeyUpUnpressed(client: Socket): void {
    if (client.data.side === 'left') {
      client.data.playground.leftPaddleController.keyUpUnpressed();
    } else if (client.data.side === 'right') {
      client.data.playground.rightPaddleController.keyUpUnpressed();
    }
  }

  handleKeyDownUnpressed(client: Socket): void {
    if (client.data.side === 'left') {
      client.data.playground.leftPaddleController.keyDownUnpressed();
    } else if (client.data.side === 'right') {
      client.data.playground.rightPaddleController.keyDownUnpressed();
    }
  }

  handleTouchMove(client: Socket, data: { y: number }) {
    if (client.data.side === 'left') {
      client.data.playground.leftPaddle.touchMove(
        data.y,
        client.data.playground.bounds,
      );
    } else if (client.data.side === 'right') {
      client.data.playground.rightPaddle.touchMove(
        data.y,
        client.data.playground.bounds,
      );
    }
  }
}