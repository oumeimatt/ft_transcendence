import { PaddleInterface } from './Paddle';
import { BallInterface } from './Ball';
import { ScoreBoardInterface } from './ScoreBoard';

export interface PlayGroundInterface {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  leftPaddle: PaddleInterface;
  rightPaddle: PaddleInterface;
  ball: BallInterface;
  score: ScoreBoardInterface;
}
