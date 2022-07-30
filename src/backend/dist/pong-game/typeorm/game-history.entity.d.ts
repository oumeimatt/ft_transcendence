import { Player } from '../../players/player.entity';
import { GameMood } from '../interfaces';
export declare class GameHistory {
    id: number;
    mode: GameMood;
    winner: Player;
    loser: Player;
    winnerScore: number;
    loserScore: number;
    createdAt: Date;
}
