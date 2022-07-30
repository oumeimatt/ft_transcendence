"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paddle = void 0;
class Paddle {
    constructor(x, y, width, height, color, difficult) {
        this._x = x;
        this._y = y;
        this._xStartPos = x;
        this._yStartPos = y;
        this._width = width;
        this._height = height;
        this._color = color;
        this._difficult = difficult;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get color() {
        return this._color;
    }
    set X(value) {
        this._x = value;
    }
    set Y(value) {
        this._y = value;
    }
    set Width(value) {
        this._width = value;
    }
    set Height(value) {
        this._height = value;
    }
    set Color(value) {
        this._color = value;
    }
    get bounds() {
        return {
            left: this._x,
            right: this._x + this._width,
            upper: this._y,
            lower: this._y + this._height,
        };
    }
    getPaddleInterface() {
        return {
            x: this._x,
            y: this._y,
            width: this._width,
            height: this._height,
            color: this._color,
        };
    }
    update(valueX, valueY) {
        this._x = valueX;
        this._y = valueY;
    }
    moveUp(bounds) {
        this._y -= this._difficult ? 6 : 4;
        if (this._y < bounds.upper) {
            this._y = bounds.upper;
        }
    }
    moveDown(bounds) {
        this._y += this._difficult ? 6 : 4;
        if (this._y + this._height > bounds.lower) {
            this._y = bounds.lower - this._height;
        }
    }
    touchMove(y, bounds) {
        this._y = y;
        if (this._y + this._height > bounds.lower) {
            this._y = bounds.lower - this._height;
        }
        if (this._y < bounds.upper) {
            this._y = bounds.upper;
        }
    }
    reset() {
        this._x = this._xStartPos;
        this._y = this._yStartPos;
    }
}
exports.Paddle = Paddle;
//# sourceMappingURL=Paddle.js.map