"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPlayer = void 0;
const common_1 = require("@nestjs/common");
exports.GetPlayer = (0, common_1.createParamDecorator)((data, Req) => {
    console.log(Req);
});
//# sourceMappingURL=get-player.decorator.js.map