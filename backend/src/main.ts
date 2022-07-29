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







// td list:

	//+ catch expired token exception
	//+ users status depending on connectedUsers table


//! errors
//[Nest] 6028  - 07/26/2022, 9:45:29 PM   ERROR [ExceptionsHandler] ENOENT: no such file or directory, stat '/Users/iidzim/Desktop/ft_transcendence/backend/public/index.html'


	
// website: http://10.11.11.1
// redirect uri: http://10.11.11.1:3001/auth/login
