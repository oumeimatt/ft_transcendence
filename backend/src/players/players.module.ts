import { Module } from '@nestjs/common';
import { UsersController } from "./players.controller";
import { UsersService } from "./players.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerRepository } from './player.repository';
import { RelationsService } from '../relations/relations.service';
import { RelationModule } from '../relations/relations.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/jwt.strategy';
import { roomRepository } from 'src/chat/room.repository';
import { memoryUsage } from 'process';
import { membership } from 'src/chat/membership.entity';
import { room } from 'src/chat/room.entity';
import { message } from 'src/chat/gateway/message.entity';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'pingpong',
            signOptions: {
				expiresIn: '1d',
            },
        }),
        TypeOrmModule.forFeature([PlayerRepository, membership, roomRepository]),
        RelationModule,
    ],
    controllers: [UsersController],
    providers: [
        UsersService,
        JwtStrategy,
    ],
    exports: [UsersService],
})
export class PlayerModule {}