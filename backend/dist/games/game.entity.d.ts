import { BaseEntity } from "typeorm";
import { GameStatus } from "./game_status.enum";
export declare class Game extends BaseEntity {
    id: number;
    score_winner: number;
    score_loser: number;
    status: GameStatus;
    date: Date;
}
