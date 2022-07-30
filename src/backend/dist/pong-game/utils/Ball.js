"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ball = void 0;
class Ball {
    constructor(x, y, radius, color, difficult) {
        this._x = x;
        this._y = y;
        this._radius = radius;
        this._speed = difficult ? 7 : 5;
        this._velocityX = 5;
        this._velocityY = 5;
        this._color = color;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get radius() {
        return this._radius;
    }
    get speed() {
        return this._speed;
    }
    get velocityX() {
        return this._velocityX;
    }
    get velocityY() {
        return this._velocityY;
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
    set Radius(value) {
        this._radius = value;
    }
    set Color(value) {
        this._color = value;
    }
    get bounds() {
        return {
            left: this._x - this._radius,
            right: this._x + this._radius,
            upper: this._y - this._radius,
            lower: this._y + this._radius,
        };
    }
    collision(paddle) {
        const { left: pLeft, right: pRight, upper: pTop, lower: pButtom, } = paddle.bounds;
        const { left: bLeft, right: bRight, upper: bTop, lower: bButtom, } = this.bounds;
        return bRight > pLeft && bLeft < pRight && bTop < pButtom && bButtom > pTop;
    }
    update(pWidth, pHeight, lPaddle, rPaddle) {
        this._x += this._velocityX;
        this._y += this._velocityY;
        if (this._y + this._radius > pHeight || this._y - this._radius < 0) {
            this._velocityY = -this._velocityY;
        }
        const player = this._x + this._radius < pWidth / 2 ? lPaddle : rPaddle;
        if (this.collision(player)) {
            let collidePoint = this._y - (player.y + player.height / 2);
            collidePoint = collidePoint / (player.height / 2);
            const angleRad = (Math.PI / 4) * collidePoint;
            const direction = this._x + this._radius < pWidth / 2 ? 1 : -1;
            this._velocityX = direction * this._speed * Math.cos(angleRad);
            this._velocityY = this._speed * Math.sin(angleRad);
            this._speed += 0.1;
        }
    }
    getBallInterface() {
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
    reset(xc, yc, difficult) {
        this._speed = difficult ? 7 : 5;
        this._x = xc;
        this._y = yc;
        this._velocityX = Math.random() > 0.5 ? -5 : 5;
    }
}
exports.Ball = Ball;
//# sourceMappingURL=Ball.js.map