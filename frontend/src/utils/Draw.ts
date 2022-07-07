import { BallInterface, PaddleInterface, PlaygroundInterface } from "@/interfaces";

export default {
  getFactors: function ( servWidth: number, servHeight: number, pgWidth: number, pgHeight: number ): { vert: number, horz: number } {
    return ({
      vert: servWidth / pgWidth,
      horz: servHeight / pgHeight
    });
  },
  drawPlayground: function ( context: CanvasRenderingContext2D, pgWidth: number, pgHeight: number, color: string ) {
    context.fillStyle = color;
    context.fillRect(0, 0, pgWidth, pgHeight);
  },
  drawBall: function ( context: CanvasRenderingContext2D, ball: BallInterface, playground: PlaygroundInterface, pgWidth: number, pgHeight: number ) {
    const facts = this.getFactors( playground.width, playground.height, pgWidth, pgHeight );
    context.fillStyle = ball.color;
    context.beginPath();
    context.arc(ball.x / facts.vert, ball.y / facts.horz, ball.radius / facts.vert, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  },
  drawPaddle: function ( context: CanvasRenderingContext2D, paddle: PaddleInterface, playground: PlaygroundInterface, pgWidth: number, pgHeight: number ) {
    const facts = this.getFactors( playground.width, playground.height, pgWidth, pgHeight );
    context.fillStyle = paddle.color;
    context.fillRect(paddle.x / facts.vert, paddle.y / facts.horz, paddle.width / facts.vert, paddle.height / facts.horz);
  },
  drawNet( context: CanvasRenderingContext2D, pgWidth: number, pgHeight: number, color: string ) {
    const net = {
      x: pgWidth / 2 - 1,
      y: 0,
      width: 3,
      height: 15,
      color: color
    };
    for (let i = 0; i <= pgHeight; i += 26) {
      context.fillStyle = net.color;
      context.fillRect(net.x, net.y + i, net.width, net.height);
    }
  },
  drawText: function( context: CanvasRenderingContext2D, text: string, x: number, y: number, width: number, color: string) {
    context.fillStyle = color;
    context.font =  (width / 15) + 'px Arial';
    context.textAlign = 'center';
    context.fillText(text, x, y);
  },

  clearContext: function( context: CanvasRenderingContext2D, pgWidth: number, pgHeight: number ) {
    context.clearRect(0, 0, pgWidth, pgHeight);
  },

  updatePlayground: function (playground: PlaygroundInterface,context: CanvasRenderingContext2D, pgWidth: number, pgHeight: number) {
    this.clearContext(context, pgWidth, pgHeight);
    this.drawPlayground(context, pgWidth, pgHeight, playground.color);
    this.drawText(
      context,
      playground.score.playerOneScore.toString(),
      pgWidth / 4, pgHeight / 5, pgWidth,
      (playground.ball as BallInterface).color
    );
    this.drawText(
      context,
      playground.score.playerTwoScore.toString(),
      (pgWidth * 3) / 4, pgHeight / 5,
      pgWidth, (playground.ball as BallInterface).color
    );
    this.drawNet(context, pgWidth, pgHeight, (playground.ball as BallInterface).color);
    this.drawBall(context, playground.ball as BallInterface, playground, pgWidth, pgHeight)
    this.drawPaddle(context, playground.leftPaddle as PaddleInterface, playground, pgWidth, pgHeight);
    this.drawPaddle(context, playground.rightPaddle as PaddleInterface, playground, pgWidth, pgHeight);
  }
};