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

	// ! upadte user status online/offline
	// 	= update date column in users table for each request made by the user
	// 		& function supervisor loop over all ONLINE users
	// 			- if the user is inactive for more than 10 minutes, switch his status to offline


	// get all online users
	// login with 2fa - validate code

	