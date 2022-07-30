import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from "./players.controller";
import { UsersService } from "./players.service";
import { PlayerRepository } from './player.repository';
import { RelationModule } from '../relations/relations.module';
import { JwtStrategy } from '../auth/jwt.strategy';
import { RelationRepository } from '../relations/relation.repository';
import { membership } from 'src/chat/membership.entity';
import { roomRepository } from 'src/chat/room.repository';
import { AppGateway } from './app.gateway';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'pingpong',
            signOptions: {
				expiresIn: '1d',
            },
        }),
        TypeOrmModule.forFeature([
            PlayerRepository,
            membership,
            roomRepository,
            RelationRepository
        ]),
        RelationModule,
    ],
    controllers: [UsersController],
    providers: [
        UsersService,
        JwtStrategy,
        AppGateway,
    ],
    exports: [UsersService],
})
export class PlayerModule {}