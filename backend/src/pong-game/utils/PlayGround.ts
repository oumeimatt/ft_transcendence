import { PlayGroundInterface } from '../interfaces';
import { Ball } from './Ball';
import { Bounds } from './Bounds';
import { Paddle } from './Paddle';
import { PaddleController } from './PaddleController';
import { ScoreBoard } from './ScoreBoard';

export class PlayGround {
  private _x: number;
  private _y: number;
  private _width: number;
  private _height: number;
  private _color: string;
  private _ball: Ball;
  private _leftPaddle: Paddle;
  private _rightPaddle: Paddle;
  private _leftPaddleController: PaddleController;
  private _rightPaddleController: PaddleController;
  private _scoreBoard: ScoreBoard;
  private _win_score: number;
  private _difficult: boolean;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    win_score: number,
    difficult: boolean,
  ) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._color = color;
    this._difficult = difficult;
    this._leftPaddle = new Paddle(
      this._x + this.getPaddleWidth(),
      (this._x + this._height) / 2 - (this._y + this.getPaddleHeight()) / 2,
      this.getPaddleWidth(),
      this.getPaddleHeight(),
      this._difficult ? 'red' : 'white',
      this._difficult,
    );
    this._rightPaddle = new Paddle(
      this._x + this._width - this.getPaddleWidth() * 2,
      (this._y + this._height) / 2 - this.getPaddleHeight() / 2,
      this.getPaddleWidth(),
      this.getPaddleHeight(),
      this._difficult ? 'red' : 'white',
      this._difficult,
    );
    this._ball = new Ball(
      this._width / 2,
      this._height / 2,
      this.getRadius(),
      difficult ? 'red' : 'white',
      this._difficult,
    );
    this._leftPaddleController = new PaddleController(this._leftPaddle);
    this._rightPaddleController = new PaddleController(this._rightPaddle);
    this._scoreBoard = new ScoreBoard();
    this._win_score = win_score;
  }

  public get x(): number {
    return this._x;
  }
  public get y(): number {
    return this._y;
  }
  public get width(): number {
    return this._width;
  }
  public get height(): number {
    return this._height;
  }
  public get color(): string {
    return this._color;
  }
  public get ball(): Ball {
    return this._ball;
  }
  public get leftPaddle(): Paddle {
    return this._leftPaddle;
  }
  public get rightPaddle(): Paddle {
    return this._rightPaddle;
  }
  public get leftPaddleController(): PaddleController {
    return this._leftPaddleController;
  }
  public get rightPaddleController(): PaddleController {
    return this._rightPaddleController;
  }
  public get win_score(): number {
    return this._win_score;
  }

  private getRadius(): number {
    let rad =
      (this._width + this._height) / 25 < 20
        ? (this._width + this._height) / 25
        : 20;
    rad -= this._difficult ? rad / 5 : 0;
    return rad;
  }

  private getPaddleWidth(): number {
    let wid = this._width / 15 < 12 ? this._width / 15 : 12;
    wid -= this._difficult ? wid / 5 : 0;
    return wid;
  }

  private getPaddleHeight(): number {
    let hei = this._height / 5 < 150 ? this._height / 5 : 150;
    hei -= this._difficult ? hei / 5 : 0;
    return hei;
  }

  public getPlayGroundInterface(): PlayGroundInterface {
    return {
      x: this._x,
      y: this._y,
      width: this._width,
      height: this._height,
      color: this._color,
      leftPaddle: this._leftPaddle.getPaddleInterface(),
      rightPaddle: this._rightPaddle.getPaddleInterface(),
      ball: this._ball.getBallInterface(),
      score: this._scoreBoard.getScoreBoardInterface(),
    };
  }


  public get bounds(): Bounds {
    return {
      left: this._x,
      right: this._x + this._width,
      upper: this._y,
      lower: this._y + this.height,
    };
  }

  public get scoreBoard(): ScoreBoard {
    return this._scoreBoard;
  }

  public update(/* roomname: string, wss: Server */): boolean {
    if (
      this._scoreBoard.playerOneScore !== this._win_score &&
      this._scoreBoard.playerTwoScore !== this._win_score
    ) {
      this._leftPaddleController.update(this.bounds);
      this._rightPaddleController.update(this.bounds);
      this._ball.update(
        this._width,
        this._height,
        this._leftPaddle,
        this._rightPaddle,
      );
      if (this._ball.x - this._ball.radius < 0) {
        this._scoreBoard.PlayerTwoScored();
        this._ball.reset(this._width / 2, this._height / 2, this._difficult);
      } else if (this._ball.x + this._ball.radius > this._width) {
        this._scoreBoard.PlayerOneScored();
        this._ball.reset(this._width / 2, this._height / 2, this._difficult);
      }
      return false;
    } else {
      return true;
    }
  }
}
