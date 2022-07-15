import { BallInterface } from '../interfaces';
import { Bounds } from './Bounds';
import { Paddle } from './Paddle';
export declare class Ball {
    private _x;
    private _y;
    private _radius;
    private _speed;
    private _velocityX;
    private _velocityY;
    private _color;
    constructor(x: number, y: number, radius: number, color: string, difficult: boolean);
    get x(): number;
    get y(): number;
    get radius(): number;
    get speed(): number;
    get velocityX(): number;
    get velocityY(): number;
    get color(): string;
    set X(value: number);
    set Y(value: number);
    set Radius(value: number);
    set Color(value: string);
    get bounds(): Bounds;
    collision(paddle: Paddle): boolean;
    update(pWidth: number, pHeight: number, lPaddle: Paddle, rPaddle: Paddle): void;
    getBallInterface(): BallInterface;
    reset(xc: number, yc: number, difficult: boolean): void;
}
