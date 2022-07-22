import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GameMood } from '../interfaces';

@Entity()
export class GameRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomname: string;

  @Column()
  difficulty: GameMood;

  @Column()
  player1: string;

  @Column()
  player2: string;
}
