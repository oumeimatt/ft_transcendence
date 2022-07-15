"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaddleController = void 0;
class PaddleController {
    constructor(paddle) {
        this._paddle = paddle;
        this._isKeyUpPressed = false;
        this._isKeyDownPressed = false;
    }
    keyUpPressed() {
        this._isKeyUpPressed = true;
    }
    keyUpUnpressed() {
        this._isKeyUpPressed = false;
    }
    keyDownPressed() {
        this._isKeyDownPressed = true;
    }
    keyDownUnpressed() {
        this._isKeyDownPressed = false;
    }
    get velocity() {
        let velocity = 0;
        if (this._isKeyUpPressed)
            velocity -= 1;
        if (this._isKeyDownPressed)
            velocity += 1;
        return velocity;
    }
    update(bounds) {
        if (this.velocity > 0) {
            this._paddle.moveDown(bounds);
        }
        else if (this.velocity) {
            this._paddle.moveUp(bounds);
        }
    }
}
exports.PaddleController = PaddleController;
//# sourceMappingURL=PaddleController.js.map