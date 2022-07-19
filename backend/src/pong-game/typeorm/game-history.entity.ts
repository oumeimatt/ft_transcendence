import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GameHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  difficulty: string;

  @Column()
  winner: string;

  @Column()
  loser: string;

  @Column()
  winnerScore: number;

  @Column()
  loserScore: number;
}