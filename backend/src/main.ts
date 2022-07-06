import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { PassportModule } from '@nestjs/passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({origin:'*' , credentials: true});
 // ['*'],["http://localhost:3000/", "https://api.intra.42.fr/"]
  await app.listen(3001);
}
bootstrap();