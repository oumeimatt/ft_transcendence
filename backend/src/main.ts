import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({origin: ["http://localhost:3000/", "https://api.intra.42.fr/"], credentials: true});
  await app.listen(3001);
}
bootstrap();