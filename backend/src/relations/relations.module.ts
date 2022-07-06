import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerRepository } from '../players/player.repository';
import { PlayerModule } from '../players/players.module';
import { UsersService } from '../players/players.service';
import { RelationRepository } from './relation.repository';
import { RelationsController } from "./relations.controller";
import { RelationsService } from "./relations.service";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'pingpong',
            signOptions: {
                expiresIn: '1d',
            },
        }),
        TypeOrmModule.forFeature([RelationRepository]),
        TypeOrmModule.forFeature([PlayerRepository]),
        // PlayerModule,
    ],
    controllers: [RelationsController],
    providers: [
        RelationsService,
        UsersService,
    ],
    exports: [RelationsService],
})
export class RelationModule {}