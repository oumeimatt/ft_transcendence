import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameService } from "./games.service";
import { GameController } from "./games.controller";
import { GameRepository } from "./game.repository";
import { PlayerModule } from '../players/players.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([GameRepository]),
        PlayerModule,
    ],
    controllers: [GameController],
    providers: [GameService],
})
export class GameModule {}