import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatGateway } from './chat.gateway';
import { roomRepository } from './room.repository';
import { ChatService } from './chat.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { ChatController } from './chat.controller';
import { membership } from './membership.entity';
import { message } from './message.entity';
import { PlayerRepository } from 'src/players/player.repository';
import { RelationModule } from 'src/relations/relations.module';


@Module({
  imports:[AuthModule,RelationModule , TypeOrmModule.forFeature([roomRepository, PlayerRepository, membership, message]),],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController], //ChatService, RoomService, JwtStrategy, AuthService],
})

export class ChatModule {}