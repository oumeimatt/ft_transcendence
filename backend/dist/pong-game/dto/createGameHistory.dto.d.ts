import { Player } from '../../players/player.entity';
export declare class CreateGameHistoryDto {
    mode: string;
    winner: Player;
    loser: Player;
    winnerScore: number;
    loserScore: number;
}
