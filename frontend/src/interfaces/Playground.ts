import { PaddleInterface } from "./Paddle";
import { BallInterface } from "./Ball";
import { ScoreBoardInterface } from "./ScoreBoard";

export interface PlaygroundInterface {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    ball: BallInterface;
    leftPaddle: PaddleInterface;
    rightPaddle: PaddleInterface;
    score: ScoreBoardInterface;
}