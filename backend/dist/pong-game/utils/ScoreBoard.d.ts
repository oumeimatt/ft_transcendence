import { ScoreBoardInterface } from '../interfaces';
export declare class ScoreBoard {
    private _playerOneScore;
    private _playerTwoScore;
    private _round;
    constructor();
    get playerOneScore(): number;
    get playerTwoScore(): number;
    set playerOneScore(score: number);
    set playerTwoScore(score: number);
    get round(): number;
    PlayerOneScored(): void;
    PlayerTwoScored(): void;
    getScoreBoardInterface(): ScoreBoardInterface;
    reset(): void;
}
