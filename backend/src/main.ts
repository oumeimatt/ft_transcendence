import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
//import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

//   const config = new DocumentBuilder()
// 	.setTitle('NestJS API')
// 	.setDescription('The NestJS API description')
// 	.setVersion('1.0')
// 	.addTag('api')
// 	.build();
  
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  app.enableCors({origin: "http://localhost:3000", credentials: true}); // edited
//   app.enableCors({
//     origin: ["http://localhost:3000/", "https://api.intra.42.fr/"],
//     methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'HEAD'],
//     credentials: true
//   });
  await app.listen(3001);
}
bootstrap();







//td list:
	//- upload avatar
	//- fix relations
	//& get all friends
	//= enable two factor authentication
	