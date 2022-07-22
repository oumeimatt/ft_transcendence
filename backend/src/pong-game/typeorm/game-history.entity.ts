import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from '../../players/player.entity';
import { GameMood } from '../interfaces';

@Entity()
export class GameHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mode: GameMood;

  @ManyToOne(() => Player)
  winner: Player;

  @ManyToOne(() => Player)
  loser: Player;

  @Column()
  winnerScore: number;

  @Column()
  loserScore: number;
}