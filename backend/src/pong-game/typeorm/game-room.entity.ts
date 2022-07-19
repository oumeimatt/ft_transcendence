import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GameRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomname: string;

  @Column()
  difficulty: string;

  @Column()
  player1: string;

  @Column()
  player2: string;
}
