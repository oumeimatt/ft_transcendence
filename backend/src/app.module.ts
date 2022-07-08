import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { PlayerModule } from './players/players.module';
import { RelationModule } from './relations/relations.module';
import { DefaultGateway } from './pong-game/default.gateway';
import { DifficultGateway } from './pong-game/difficult.gateway';
import { PongGameService } from './pong-game/pong-game.service';
import { PongGameModule } from './pong-game/pong-game.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    PlayerModule,
    RelationModule,
    PongGameModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}