"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.enableCors({ origin: ["http://localhost:3000/", "https://api.intra.42.fr/"], credentials: true });
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map