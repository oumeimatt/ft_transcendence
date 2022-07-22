import { Bounds } from './Bounds';
import { Paddle } from './Paddle';
export declare class PaddleController {
    private _paddle;
    private _isKeyUpPressed;
    private _isKeyDownPressed;
    constructor(paddle: Paddle);
    keyUpPressed(): void;
    keyUpUnpressed(): void;
    keyDownPressed(): void;
    keyDownUnpressed(): void;
    get velocity(): number;
    update(bounds: Bounds): void;
}
