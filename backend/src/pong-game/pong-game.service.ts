import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameRoom } from './typeorm/game-room.entity';
import { Repository } from 'typeorm';
import { CreateGameRoomDto } from './dto/createGameRoom.dto';

@Injectable()
export class PongGameService {
  constructor(
    @InjectRepository(GameRoom) private roomRepository: Repository<GameRoom>,
  ) {}

  async getRooms(): Promise<{ rooms: GameRoom[] }> {
    const rooms = await this.roomRepository.find();
    return { rooms: rooms };
  }

  async addRoom(Createroom: CreateGameRoomDto): Promise<GameRoom> {
    const { roomname, difficulty } = Createroom;
    const room = new GameRoom();

    room.roomname = roomname;
    room.difficulty = difficulty;

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
}
