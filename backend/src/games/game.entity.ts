import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinTable, OneToMany, CreateDateColumn } from "typeorm";
import { Player } from "../players/player.entity";
import { GameStatus } from "./game_status.enum";

@Entity('match')
export class Game extends BaseEntity{

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	score_winner: number;

	@Column()
	score_loser: number;

	@Column({default: GameStatus.GAMEOVER})
	status: GameStatus;

	@CreateDateColumn()
	date: Date;

	// @ManyToOne(type => Player, player => player.wins)
	// winner: Player;

	// @ManyToOne(type => Player, player => player.losses)
	// loser: Player;
}