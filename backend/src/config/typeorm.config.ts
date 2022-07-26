import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { message } from "src/chat/message.entity";
import { membership } from "src/chat/membership.entity";
import { chatroom } from "src/chat/room.entity";
import { Player } from "../players/player.entity";
import { Relation } from "../relations/relation.entity";
import { GameRoom } from "src/pong-game/typeorm/game-room.entity";
import { GameHistory } from "src/pong-game/typeorm/game-history.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    // host: '127.0.0.1',
    host: '10.11.1.10',
    port: 5432,
    username: 'ping',
    password: 'pong',
    database: 'pong_db',
    // entities: [__dirname + '/../**/*.entity.ts'],
    entities: [
        Player,
        Relation,
        chatroom,
        membership,
        message,
        GameRoom,
        GameHistory
    ],
    synchronize: true,
    logging: false,
    autoLoadEntities : true,
}


// synchronize - Indicates if database schema should be auto created on every application launch.
// Be careful with this option and don't use this in production - otherwise you can lose production data.
// This option is useful during debug and development.