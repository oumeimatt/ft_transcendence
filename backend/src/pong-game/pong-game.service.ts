import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './typeorm/room.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/createRoom.dt';

@Injectable()
export class PongGameService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
  ) {}

  async getRooms(): Promise<{ rooms: Room[] }> {
    const rooms = await this.roomRepository.find();
    return { rooms: rooms };
  }

  async addRoom(Createroom: CreateRoomDto): Promise<Room> {
    const { roomname, difficulty } = Createroom;
    const room = new Room();

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
