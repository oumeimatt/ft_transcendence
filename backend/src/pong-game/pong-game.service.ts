import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameRoom } from './typeorm/game-room.entity';
import { Repository } from 'typeorm';
import { CreateGameRoomDto } from './dto/createGameRoom.dto';
import { GameHistory } from './typeorm/game-history.entity';
import { CreateGameHistoryDto } from './dto/createGameHistory.dto';

@Injectable()
export class PongGameService {
  constructor(
    @InjectRepository(GameRoom) private roomRepository: Repository<GameRoom>,
    @InjectRepository(GameHistory) private gameRepository: Repository<GameHistory>,
  ) {}

  async getRooms(): Promise<{ gamesRooms: GameRoom[] }> {
    const rooms = await this.roomRepository.find();
    return { gamesRooms: rooms };
  }

  
  async addRoom(Createroom: CreateGameRoomDto): Promise<GameRoom> {
    const { roomname, difficulty, player1, player2 } = Createroom;
    const room = new GameRoom();
    
    room.roomname = roomname;
    room.difficulty = difficulty;
    room.player1 = player1;
    room.player2 = player2;
    
    try {
      await this.roomRepository.save(room);
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return room;
  }
  
  async deleteRoom(roomname: string): Promise<void> {
    await this.roomRepository.delete({ roomname: roomname });
  }

  async getGamesHistory(id: number): Promise<{ gamesHistory: GameHistory[] }> {
    const games = await this.gameRepository.find({
      relations: ['winner', 'loser'],
      where: [
        {
          winner: {
            id: id
          },
        },
        {
          loser: {
            id: id
          },
        }
      ],
      select: ['winner', 'loser', 'winnerScore', 'loserScore', 'mode']
    });
    games.map((game) => {
      // delete unused data from winner
      delete game.winner.id;
      delete game.winner.avatar;
      delete game.winner.level;
      delete game.winner.losses;
      delete game.winner.wins;
      delete game.winner.status;
      delete game.winner.senders;
      delete game.winner.two_fa;
      // delete unused data from loser
      delete game.loser.id;
      delete game.loser.avatar;
      delete game.loser.level;
      delete game.loser.losses;
      delete game.loser.wins;
      delete game.loser.status;
      delete game.loser.senders;
      delete game.loser.two_fa;
    });
    return { gamesHistory: games };
  }

  async addGameHistory(createGameHistoryDto: CreateGameHistoryDto): Promise<CreateGameHistoryDto> {
    const { mode, winner, loser, winnerScore, loserScore } = createGameHistoryDto;
    const gamesHistory = new GameHistory();
    
    gamesHistory.mode = mode;
    gamesHistory.winner = winner;
    gamesHistory.loser = loser;
    gamesHistory.winnerScore = winnerScore;
    gamesHistory.loserScore = loserScore;
    
    try {
      await this.gameRepository.save(gamesHistory);
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return gamesHistory;
  }
}
