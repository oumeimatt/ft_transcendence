import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultGateway } from './default.gateway';
import { DefaultService } from './default.service';
import { DifficultGateway } from './difficult.gateway';
import { DifficultService } from './difficult.service';
import { PongGameController } from './pong-game.controller';
import { PongGameService } from './pong-game.service';
import { Room } from './typeorm/room.entity';
import { OneVOneService } from './one-v-one.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  controllers: [PongGameController],
  providers: [
    PongGameService,
    DefaultGateway,
    DifficultGateway,
    DefaultService,
    DifficultService,
    OneVOneService,
  ],
})
export class PongGameModule {}
