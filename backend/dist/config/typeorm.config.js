"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const message_entity_1 = require("../chat/message.entity");
const membership_entity_1 = require("../chat/membership.entity");
const room_entity_1 = require("../chat/room.entity");
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
        relation_entity_1.Relation,
        room_entity_1.chatroom,
        membership_entity_1.membership,
        message_entity_1.message,
    ],
    synchronize: true,
    logging: false,
    autoLoadEntities: true,
};
//# sourceMappingURL=typeorm.config.js.map