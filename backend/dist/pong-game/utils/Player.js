"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(id, name, avatar) {
        this._id = id;
        this._name = name;
        this._avatar = avatar;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get avatar() {
        return this._avatar;
    }
    getPlayerInterface() {
        return {
            id: this._id,
            name: this._name,
            avatar: this.avatar,
        };
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map