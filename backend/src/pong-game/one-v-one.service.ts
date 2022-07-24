import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { UsersService } from 'src/players/players.service';
import { UserStatus } from 'src/players/player_status.enum';
import { GameMood, PlayGroundInterface } from './interfaces';
import { PongGameService } from './pong-game.service';
import { PlayGround } from './utils';

@Injectable()
export class OneVOneService {
  readonly logger = new Logger('OneVOne PongGame Service: ');
  readonly emptyPlayground = new PlayGround(0, 0, 1000, 600, '#0A5B70ff', 9, false, '', '');
  constructor(private pongGameService: PongGameService, private usersService: UsersService) {}

  handleGetBackGround(playground: PlayGround): PlayGroundInterface {
    return playground.getPlayGroundInterface();
  }

  handleUserConnected(client: Socket, players: Socket[], wss: Server): void {
    // if the connected is a player add him to list of players
    if (client.handshake.query.role === 'player') {
      this.handlePlayerConnected(client, players, wss);
    } else if (client.handshake.query.role === 'spectator') {
      this.logger.log('spectator Connected: ' + client.id + ', roomname: ' + client.handshake.query.roomname);
      this.handleSpectatorConnected(client);
    }
  }

  // function handles when Spectator is connected to the oneVone gateway
  async handleSpectatorConnected(client: Socket): Promise<void> {
    const { gamesRooms } = await this.pongGameService.getRooms();
    const roomname = client.handshake.query.roomname;
    const found = gamesRooms.find(room => room.roomname == roomname);
    if (found) {
      client.join(roomname);
    } else {
      client.emit('roomnotfound', {
        message: 'No such a Room',
      });
    }
  }

  // function handles when player is connected to the oneVone gateway
  async handlePlayerConnected(
    client: Socket,
    players: Socket[],
    wss: Server,
    ): Promise<void> {
    const user = await this.usersService.verifyToken(client.handshake.query.accessToken as string);
    client.data.user = user;
    const found = await this.usersService.findPlayer(user.id);
    if (found && found.status === UserStatus.PLAYING) {
      client.emit('alreadyInGame', {
        player: user.username,
        message: 'You Are Already in a Game',
      });
    }
    else if (found && found.status === UserStatus.ONLINE) {
      const first = players.find(
        player => player.handshake.query.opponent === client.data.user.username
        && player.data.user.username === client.handshake.query.opponent);
      if (!first) {
        // if he inters first keep him waiting
        players.push(client);
        await this.usersService.updateStatus(user.id, UserStatus.PLAYING);
        // if opponent didnt enter the game yet
        client.data.side = 'left';
        client.data.role = 'player';
        client.emit('WaitingForPlayer', {
          player: user.username,
          message: 'Waiting For Second Player',
          playground: this.emptyPlayground.getPlayGroundInterface(),
        });
      }
      else {
        // remove player1 from the Array
        players = players.filter(player => player != first);
        // if another player is waiting  Start the game
        client.data.side = 'right';
        client.data.role = 'player';
        const second = client;
        await this.usersService.updateStatus(second.data.user.id, UserStatus.PLAYING);
        // function to add two players to a game
        this.joinPlayersToGame(first, second, wss);
      }
    }
  }

  joinPlayersToGame(first: Socket, second: Socket, wss: Server) {
    const roomname = first.id + '+' + second.id;
  
    // join players to room
    first.join(roomname);
    second.join(roomname);
    first.data.roomname = roomname;
    second.data.roomname = roomname;

    // set up opponent for both players
    first.data.opponentId = second.data.user.id;
    second.data.opponentId = first.data.user.id;

   // push room to database
    this.pongGameService.addRoom({
      roomname, difficulty: GameMood.ONEVONE, player1: first.data.user.username as string,
      player2: second.data.user.username as string
    });

    // create a playground for players
    const playground = new PlayGround(0, 0, 1000, 600, '#0A5B70ff', 13, false, first.data.user.username, second.data.user.username);
    first.data.playground = playground;
    second.data.playground = playground;
    this.logger.log('Starting Game in Room: ' + roomname + ' between: ' + first.data.user.username + ' & '+ second.data.user.username);
    const timer = setInterval(() => {
      if (playground.update(/* roomname, wss */) == false) {
        // get interface to send to frontend
        const pgi = this.handleGetBackGround(playground);

        // broadcast game to players in room
        wss
          .to(roomname)
          .emit('updatePlayground', { name: roomname, playground: pgi });
      } else {
        this.gameFinished(first, second, playground, wss);
      }
    }, (1.0 / 60) * 1000);
    first.data.gameInterval = timer;
    second.data.gameInterval = timer;
  }

  async gameFinished(first: Socket, second: Socket, playground: PlayGround, wss: Server) {
    // game finished
    clearInterval(first.data.gameInterval);
    this.logger.log('Game in Room: ' + first.data.roomname + ' between: ', first.data.user.username + ' & ' + second.data.user.username + ' Finished');
    if (playground.scoreBoard.playerOneScore > playground.scoreBoard.playerTwoScore) {
      this.usersService.updateLevel(first.data.user.id, false);
      this.usersService.winsGame(first.data.user.id);
      this.usersService.LostGame(second.data.user.id);
      this.pongGameService.addGameHistory({
        mode: GameMood.ONEVONE,
        winner: first.data.user,
        loser: second.data.user,
        winnerScore: playground.scoreBoard.playerOneScore,
        loserScore: playground.scoreBoard.playerTwoScore
      });
      // send event with winner and loser
      wss.to(first.data.roomname).emit('DisplayWinner', { winner: first.data.user.username, loser: second.data.user.username });
    } else {
      this.usersService.updateLevel(second.data.user.id, false);
      this.usersService.winsGame(second.data.user.id);
      this.usersService.LostGame(first.data.user.id);
      this.pongGameService.addGameHistory({
        mode: GameMood.ONEVONE,
        winner: second.data.user,
        loser: first.data.user,
        winnerScore: playground.scoreBoard.playerTwoScore,
        loserScore: playground.scoreBoard.playerOneScore
      });
      // send event with winner and loser
      wss.to(first.data.roomname).emit('DisplayWinner', { winner: first.data.user.username, loser: second.data.user.username });
    }

    // // delete room from database
    this.pongGameService.deleteRoom(first.data.roomname);
  }

  async handleUserDisconnected(wss: Server, client: Socket) {
    if (client.handshake.query.role === 'player' && client.data.gameInterval) {
      if (client.data.gameInterval._destroyed === false) {
        client.data.playground.ball.reset(
          client.data.playground.width / 2,
          client.data.playground.height / 2,
        );
        client.data.playground.leftPaddle.reset();
        client.data.playground.rightPaddle.reset();
        if (client.handshake.query.side === 'left') {
          client.data.playground.scoreBoard.playerTwoScore = client.data.playground.win_score;
        } else {
          client.data.playground.scoreBoard.playerOneScore = client.data.playground.win_score;
        }
        wss.to(client.data.roomname).emit('gameInterrupted', {
          playground: this.handleGetBackGround(client.data.playground),
        });
        // clearInterval if not destroyed
        clearInterval(client.data.gameInterval);
        this.logger.log('Game Interval Cleared');

        // Update Level and wins and loses for both players
        await this.usersService.updateLevel(client.data.opponentId, false);
        await this.usersService.winsGame(client.data.opponentId);
        await this.usersService.LostGame(client.data.user.id);
        const second = await this.usersService.findPlayer(client.data.opponentId);
        if (second) {
          this.pongGameService.addGameHistory({
            mode: GameMood.ONEVONE,
            winner: await second,
            loser: client.data.user,
            winnerScore: client.data.playground.win_score,
            loserScore: client.handshake.query.side === 'left' && client.data.playground.scoreBoard.playerTwoScore || client.data.playground.scoreBoard.playerOneScore
          });
          // send event with winner and loser
          wss.to(client.data.roomname).emit('DisplayWinner', { winner: second.username, loser: client.data.user.username });
        }
        // delete room from database
        await this.pongGameService.deleteRoom(client.data.roomname);
        this.logger.log('Game in Room: ' + client.data.roomname + ' Finished');
    }

      // client left room
      client.leave(client.data.roomname);

      // Update Status to ONLINE again
      await this.usersService.updateStatus(client.data.user.id, UserStatus.ONLINE);

    } else if (client.handshake.query.role === 'player') {
      // Update Status to ONLINE again
      await this.usersService.updateStatus(client.data.user.id, UserStatus.ONLINE);
    } else if (client.handshake.query.role === 'spectator') {
      this.logger.log('spectator Disconnected: ' + client.id);
      client.leave(client.handshake.query.room as string);
    }
  }

  handleKeyUpPressed(client: Socket): void {
    if (client.data.role === 'player' && client.data.side === 'left') {
      client.data.playground.leftPaddleController.keyUpPressed();
    } else if (client.data.role === 'player' && client.data.side === 'right') {
      client.data.playground.rightPaddleController.keyUpPressed();
    }
  }

  handleKeyDownPressed(client: Socket): void {
    if (client.data.role === 'player' && client.data.side === 'left') {
      client.data.playground.leftPaddleController.keyDownPressed();
    } else if (client.data.role === 'player' && client.data.side === 'right') {
      client.data.playground.rightPaddleController.keyDownPressed();
    }
  }

  handleKeyUpUnpressed(client: Socket): void {
    if (client.data.role === 'player' && client.data.side === 'left') {
      client.data.playground.leftPaddleController.keyUpUnpressed();
    } else if (client.data.role === 'player' && client.data.side === 'right') {
      client.data.playground.rightPaddleController.keyUpUnpressed();
    }
  }

  handleKeyDownUnpressed(client: Socket): void {
    if (client.data.role === 'player' && client.data.side === 'left') {
      client.data.playground.leftPaddleController.keyDownUnpressed();
    } else if (client.data.role === 'player' && client.data.side === 'right') {
      client.data.playground.rightPaddleController.keyDownUnpressed();
    }
  }

  handleTouchMove(client: Socket, data: { y: number }) {
    if (client.data.role === 'player' && client.data.side === 'left') {
      client.data.playground.leftPaddle.touchMove(
        data.y,
        client.data.playground.bounds,
      );
    } else if (client.data.role === 'player' && client.data.side === 'right') {
      client.data.playground.rightPaddle.touchMove(
        data.y,
        client.data.playground.bounds,
      );
    }
  }
}
