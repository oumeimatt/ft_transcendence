import { Player } from '../../players/player.entity';
export declare class GameHistory {
    id: number;
    mode: string;
    winner: Player;
    loser: Player;
    winnerScore: number;
    loserScore: number;
}
