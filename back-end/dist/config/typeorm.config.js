"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const player_entity_1 = require("../players/player.entity");
const relation_entity_1 = require("../relations/relation.entity");
exports.typeOrmConfig = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'ping',
    password: 'pong',
    database: 'pong_db',
    entities: [
        player_entity_1.Player,
        relation_entity_1.Relation
    ],
    synchronize: true,
    logging: false,
    autoLoadEntities: true,
};
//# sourceMappingURL=typeorm.config.js.map