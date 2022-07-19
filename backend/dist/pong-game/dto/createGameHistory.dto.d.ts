import { Player } from '../utils';
export declare class CreateGameHistoryDto {
    mode: string;
    winner: Player;
    loser: Player;
    winnerScore: number;
    loserScore: number;
}
