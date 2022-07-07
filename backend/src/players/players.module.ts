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
import { RelationRepository } from '../relations/relation.repository';
import { membership } from 'src/chat/membership.entity';
import { roomRepository } from 'src/chat/room.repository';

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
        TypeOrmModule.forFeature([RelationRepository]),
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