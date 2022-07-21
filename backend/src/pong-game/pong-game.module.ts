import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultGateway } from './default.gateway';
import { DefaultService } from './default.service';
import { OneVOneGateway } from './one-v-one.gateway';
import { DifficultGateway } from './difficult.gateway';
import { DifficultService } from './difficult.service';
import { PongGameController } from './pong-game.controller';
import { PongGameService } from './pong-game.service';
import { GameRoom } from './typeorm/game-room.entity';
import { AuthModule } from 'src/auth/auth.module';
import { OneVOneService } from './one-v-one.service';
import { GameHistory } from './typeorm/game-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameRoom, GameHistory]),
    AuthModule,
  ],
  controllers: [PongGameController],
  providers: [
    PongGameService,
    DefaultGateway,
    OneVOneGateway,
    DifficultGateway,
    DefaultService,
    DifficultService,
    OneVOneService,
  ],
})
export class PongGameModule {}
