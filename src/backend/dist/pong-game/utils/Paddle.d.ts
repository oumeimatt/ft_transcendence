import { PaddleInterface } from '../interfaces';
import { Bounds } from './Bounds';
export declare class Paddle {
    private _x;
    private _y;
    private _xStartPos;
    private _yStartPos;
    private _width;
    private _height;
    private _color;
    private _difficult;
    constructor(x: number, y: number, width: number, height: number, color: string, difficult: boolean);
    get x(): number;
    get y(): number;
    get width(): number;
    get height(): number;
    get color(): string;
    set X(value: number);
    set Y(value: number);
    set Width(value: number);
    set Height(value: number);
    set Color(value: string);
    get bounds(): Bounds;
    getPaddleInterface(): PaddleInterface;
    update(valueX: number, valueY: number): void;
    moveUp(bounds: Bounds): void;
    moveDown(bounds: Bounds): void;
    touchMove(y: number, bounds: Bounds): void;
    reset(): void;
}
