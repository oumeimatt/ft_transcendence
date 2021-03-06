"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayGround = void 0;
const Ball_1 = require("./Ball");
const Paddle_1 = require("./Paddle");
const PaddleController_1 = require("./PaddleController");
const ScoreBoard_1 = require("./ScoreBoard");
class PlayGround {
    constructor(x, y, width, height, color, win_score, difficult, player1, player2) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._color = color;
        this._difficult = difficult;
        this._leftPaddle = new Paddle_1.Paddle(this._x + this.getPaddleWidth(), (this._x + this._height) / 2 - (this._y + this.getPaddleHeight()) / 2, this.getPaddleWidth(), this.getPaddleHeight(), this._difficult ? '#A9BCCBff' : '#A9BCCBff', this._difficult);
        this._rightPaddle = new Paddle_1.Paddle(this._x + this._width - this.getPaddleWidth() * 2, (this._y + this._height) / 2 - this.getPaddleHeight() / 2, this.getPaddleWidth(), this.getPaddleHeight(), this._difficult ? '#A9BCCBff' : '#A9BCCBff', this._difficult);
        this._ball = new Ball_1.Ball(this._width / 2, this._height / 2, this.getRadius(), difficult ? '#A9BCCBff' : '#A9BCCBff', this._difficult);
        this._leftPaddleController = new PaddleController_1.PaddleController(this._leftPaddle);
        this._rightPaddleController = new PaddleController_1.PaddleController(this._rightPaddle);
        this._scoreBoard = new ScoreBoard_1.ScoreBoard();
        this._win_score = win_score;
        this._player1 = player1;
        this._player2 = player2;
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
    get ball() {
        return this._ball;
    }
    get leftPaddle() {
        return this._leftPaddle;
    }
    get rightPaddle() {
        return this._rightPaddle;
    }
    get leftPaddleController() {
        return this._leftPaddleController;
    }
    get rightPaddleController() {
        return this._rightPaddleController;
    }
    get win_score() {
        return this._win_score;
    }
    get player1() {
        return this._player1;
    }
    get player2() {
        return this._player1;
    }
    getRadius() {
        let rad = (this._width + this._height) / 25 < 20
            ? (this._width + this._height) / 25
            : 20;
        rad -= this._difficult ? rad / 5 : 0;
        return rad;
    }
    getPaddleWidth() {
        let wid = this._width / 15 < 12 ? this._width / 15 : 12;
        wid -= this._difficult ? wid / 5 : 0;
        return wid;
    }
    getPaddleHeight() {
        let hei = this._height / 5 < 150 ? this._height / 5 : 150;
        hei -= this._difficult ? hei / 5 : 0;
        return hei;
    }
    getPlayGroundInterface() {
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
            player1: this._player1,
            player2: this._player2,
        };
    }
    get bounds() {
        return {
            left: this._x,
            right: this._x + this._width,
            upper: this._y,
            lower: this._y + this.height,
        };
    }
    get scoreBoard() {
        return this._scoreBoard;
    }
    update() {
        if (this._scoreBoard.playerOneScore !== this._win_score &&
            this._scoreBoard.playerTwoScore !== this._win_score) {
            this._leftPaddleController.update(this.bounds);
            this._rightPaddleController.update(this.bounds);
            this._ball.update(this._width, this._height, this._leftPaddle, this._rightPaddle);
            if (this._ball.x - this._ball.radius < 0) {
                this._scoreBoard.PlayerTwoScored();
                this._ball.reset(this._width / 2, this._height / 2, this._difficult);
            }
            else if (this._ball.x + this._ball.radius > this._width) {
                this._scoreBoard.PlayerOneScored();
                this._ball.reset(this._width / 2, this._height / 2, this._difficult);
            }
            return false;
        }
        else {
            return true;
        }
    }
}
exports.PlayGround = PlayGround;
//# sourceMappingURL=PlayGround.js.map