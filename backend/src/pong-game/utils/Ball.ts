import { BallInterface } from '../interfaces';
import { Bounds } from './Bounds';
import { Paddle } from './Paddle';

export class Ball {
  private _x: number;
  private _y: number;
  private _radius: number;
  private _speed: number;
  private _velocityX: number;
  private _velocityY: number;
  private _color: string;

  constructor(
    x: number,
    y: number,
    radius: number,
    color: string,
    difficult: boolean,
  ) {
    this._x = x;
    this._y = y;
    this._radius = radius;
    this._speed = difficult ? 7 : 5;
    this._velocityX = 5;
    this._velocityY = 5;
    this._color = color;
  }

  public get x(): number {
    return this._x;
  }
  public get y(): number {
    return this._y;
  }
  public get radius(): number {
    return this._radius;
  }
  public get speed(): number {
    return this._speed;
  }
  public get velocityX(): number {
    return this._velocityX;
  }
  public get velocityY(): number {
    return this._velocityY;
  }
  public get color(): string {
    return this._color;
  }

  public set X(value: number) {
    this._x = value;
  }
  public set Y(value: number) {
    this._y = value;
  }
  public set Radius(value: number) {
    this._radius = value;
  }
  public set Color(value: string) {
    this._color = value;
  }

  public get bounds(): Bounds {
    return {
      left: this._x - this._radius,
      right: this._x + this._radius,
      upper: this._y - this._radius,
      lower: this._y + this._radius,
    };
  }

  public collision(paddle: Paddle) {
    const {
      left: pLeft,
      right: pRight,
      upper: pTop,
      lower: pButtom,
    } = paddle.bounds;
    const {
      left: bLeft,
      right: bRight,
      upper: bTop,
      lower: bButtom,
    } = this.bounds;

    return bRight > pLeft && bLeft < pRight && bTop < pButtom && bButtom > pTop;
  }

  public update(
    pWidth: number,
    pHeight: number,
    lPaddle: Paddle,
    rPaddle: Paddle,
  ): void {
    this._x += this._velocityX;
    this._y += this._velocityY;

    // to fix the ball that stucks in bottom or top
    // if (this._y + this._radius > pHeight) {
    //   this._y = pHeight - this._radius;
    // }
    // if (this._y - this._radius < 0) {
    //   this._y = this._radius;
    // }
    // end

    if (this._y + this._radius > pHeight || this._y - this._radius < 0) {
      this._velocityY = -this._velocityY;
    }

    // choose which player to test collision
    const player = this._x + this._radius < pWidth / 2 ? lPaddle : rPaddle;

    if (this.collision(player)) {
      // console.log(this._x, ', ', this._y);
      // console.log('bound: ', this.bounds);
      let collidePoint = this._y - (player.y + player.height / 2);
      collidePoint = collidePoint / (player.height / 2);
      const angleRad = (Math.PI / 4) * collidePoint;
      const direction = this._x + this._radius < pWidth / 2 ? 1 : -1;

      this._velocityX = direction * this._speed * Math.cos(angleRad);
      this._velocityY = this._speed * Math.sin(angleRad);

      // in case the problem doesn't fix use this line
      // this._velocityX *= -1;

      this._speed += 0.1;
    }
  }

  public getBallInterface(): BallInterface {
    return {
      x: this._x,
      y: this._y,
      speed: this._speed,
      velocityX: this._velocityX,
      velocityY: this._velocityY,
      radius: this._radius,
      color: this._color,
    };
  }

  public reset(xc: number, yc: number, difficult: boolean): void {
    this._speed = difficult ? 7 : 5;
    this._x = xc;
    this._y = yc;
    this._velocityX = Math.random() > 0.5 ? -5 : 5;
  }
}
