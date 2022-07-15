import { PaddleInterface } from '../interfaces';
import { Bounds } from './Bounds';

export class Paddle {
  private _x: number;
  private _y: number;
  private _xStartPos: number;
  private _yStartPos: number;
  private _width: number;
  private _height: number;
  private _color: string;
  private _difficult: boolean;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    difficult: boolean,
  ) {
    this._x = x;
    this._y = y;
    this._xStartPos = x;
    this._yStartPos = y;
    this._width = width;
    this._height = height;
    this._color = color;
    this._difficult = difficult;
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

  public set X(value: number) {
    this._x = value;
  }
  public set Y(value: number) {
    this._y = value;
  }
  public set Width(value: number) {
    this._width = value;
  }
  public set Height(value: number) {
    this._height = value;
  }
  public set Color(value: string) {
    this._color = value;
  }

  public get bounds(): Bounds {
    return {
      left: this._x,
      right: this._x + this._width,
      upper: this._y,
      lower: this._y + this._height,
    };
  }

  public getPaddleInterface(): PaddleInterface {
    return {
      x: this._x,
      y: this._y,
      width: this._width,
      height: this._height,
      color: this._color,
    };
  }

  public update(valueX: number, valueY: number) {
    this._x = valueX;
    this._y = valueY;
  }

  public moveUp(bounds: Bounds): void {
    this._y -= this._difficult ? 6 : 4;

    if (this._y < bounds.upper) {
      this._y = bounds.upper;
    }
  }

  public moveDown(bounds: Bounds): void {
    this._y += this._difficult ? 6 : 4;

    if (this._y + this._height > bounds.lower) {
      this._y = bounds.lower - this._height;
    }
  }

  touchMove(y: number, bounds: Bounds) {
    this._y = y;
    if (this._y + this._height > bounds.lower) {
      this._y = bounds.lower - this._height;
    }
    if (this._y < bounds.upper) {
      this._y = bounds.upper;
    }
  }

  public reset(): void {
    this._x = this._xStartPos;
    this._y = this._yStartPos;
  }
}
