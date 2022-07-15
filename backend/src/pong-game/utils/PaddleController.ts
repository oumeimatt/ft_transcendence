import { Bounds } from './Bounds';
import { Paddle } from './Paddle';

export class PaddleController {
  private _paddle: Paddle;
  private _isKeyUpPressed: boolean;
  private _isKeyDownPressed: boolean;
  constructor(paddle: Paddle) {
    this._paddle = paddle;
    this._isKeyUpPressed = false;
    this._isKeyDownPressed = false;
  }
  keyUpPressed(): void {
    this._isKeyUpPressed = true;
  }
  keyUpUnpressed(): void {
    this._isKeyUpPressed = false;
  }

  keyDownPressed(): void {
    this._isKeyDownPressed = true;
  }
  keyDownUnpressed(): void {
    this._isKeyDownPressed = false;
  }

  get velocity(): number {
    let velocity = 0;
    if (this._isKeyUpPressed) velocity -= 1;
    if (this._isKeyDownPressed) velocity += 1;
    return velocity;
  }

  update(bounds: Bounds): void {
    if (this.velocity > 0) {
      this._paddle.moveDown(bounds);
    } else if (this.velocity) {
      this._paddle.moveUp(bounds);
    }
  }
}
