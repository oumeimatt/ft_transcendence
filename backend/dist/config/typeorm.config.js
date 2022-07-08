"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const room_entity_1 = require("../pong-game/typeorm/room.entity");
const player_entity_1 = require("../players/player.entity");
const relation_entity_1 = require("../relations/relation.entity");
exports.typeOrmConfig = {
    type: 'postgres',
    host: '192.168.99.115',
    port: 5432,
    username: 'ping',
    password: 'pong',
    database: 'pong_db',
    entities: [
        player_entity_1.Player,
        relation_entity_1.Relation,
        room_entity_1.Room
    ],
    synchronize: true,
    logging: false,
    autoLoadEntities: true,
};
//# sourceMappingURL=typeorm.config.js.map