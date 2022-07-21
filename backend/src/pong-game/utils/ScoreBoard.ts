import { ScoreBoardInterface } from '../interfaces';

export class ScoreBoard {
  private _playerOneScore: number;
  private _playerTwoScore: number;
  private _round: number;

  constructor() {
    this.reset();
  }

  public get playerOneScore(): number {
    return this._playerOneScore;
  }

  public get playerTwoScore(): number {
    return this._playerTwoScore;
  }

  public get round(): number {
    return this._round;
  }

  public PlayerOneScored(): void {
    this._playerOneScore++;
    this._round++;
  }

  public PlayerTwoScored(): void {
    this._playerTwoScore++;
    this._round++;
  }

  public getScoreBoardInterface(): ScoreBoardInterface {
    return {
      playerOneScore: this._playerOneScore,
      playerTwoScore: this._playerTwoScore,
      round: this._round,
    };
  }

  public reset() {
    this._playerOneScore = 0;
    this._playerTwoScore = 0;
    this._round = 0;
  }
}
