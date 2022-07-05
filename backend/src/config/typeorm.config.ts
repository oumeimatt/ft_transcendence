import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Player } from "../players/player.entity";
import { Relation } from "../relations/relation.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'ping',
    password: 'pong',
    database: 'pong_db',
    // entities: [__dirname + '/../**/*.entity.ts'],
    entities: [
        Player,
        Relation
    ],
    synchronize: true,
    logging: false,
    autoLoadEntities : true,
}

// synchronize - Indicates if database schema should be auto created on every application launch.
// Be careful with this option and don't use this in production - otherwise you can lose production data.
// This option is useful during debug and development.