"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreBoard = void 0;
class ScoreBoard {
    constructor() {
        this.reset();
    }
    get playerOneScore() {
        return this._playerOneScore;
    }
    get playerTwoScore() {
        return this._playerTwoScore;
    }
    set playerOneScore(score) {
        this._playerOneScore = score;
    }
    set playerTwoScore(score) {
        this._playerTwoScore = score;
    }
    get round() {
        return this._round;
    }
    PlayerOneScored() {
        this._playerOneScore++;
        this._round++;
    }
    PlayerTwoScored() {
        this._playerTwoScore++;
        this._round++;
    }
    getScoreBoardInterface() {
        return {
            playerOneScore: this._playerOneScore,
            playerTwoScore: this._playerTwoScore,
            round: this._round,
        };
    }
    reset() {
        this._playerOneScore = 0;
        this._playerTwoScore = 0;
        this._round = 0;
    }
}
exports.ScoreBoard = ScoreBoard;
//# sourceMappingURL=ScoreBoard.js.map