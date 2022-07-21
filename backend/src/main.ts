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
	//= enable two factor authentication
		//& Time-based one-time password (TOTP or soft token)
        //- otplib is a JavaScript One Time Password (OTP) library for OTP generation and verification

	//* if 2fa is enabled, the user must enter a valid token every time he logs in
		//+ redirect user after login to a page that asks him to enter a token
			//? if the token is valid, redirect to the original page

	//! upadte user status online/offline
		//= update date column in users table for each request made by the user
			//& function supervisor loop over all ONLINE users
				//- if the user is inactive for more than 10 minutes, switch his status to offline

	//* username must be alphanumeric
