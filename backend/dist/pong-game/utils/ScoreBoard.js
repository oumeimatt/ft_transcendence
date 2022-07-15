"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreBoard = void 0;
class ScoreBoard {
    constructor() {
        this.reset();
    }
    get winner() {
        if (this._playerOneScore >= 7) {
            return 1;
        }
        else if (this._playerTwoScore >= 7) {
            return 1;
        }
    }
    get playerOneScore() {
        return this._playerOneScore;
    }
    get playerTwoScore() {
        return this._playerTwoScore;
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