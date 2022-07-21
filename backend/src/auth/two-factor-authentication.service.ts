// import { Injectable } from '@nestjs/common';
// import { authenticator } from 'otplib';
// import { toFileStream } from 'qrcode';
// import { Response } from 'express';
// import { UsersService } from '../players/players.service';
// import { Player } from '../players/player.entity';
// import * as dotenv from "dotenv";
// dotenv.config({ path: `.env` })

// @Injectable()
// export class TwoFactorAuthenticationService {
//     constructor(
//         private readonly usersService: UsersService,
//     ) {}

//     async generateTwoFactorAuthenticationSecret(user: Player) {

//         const secret = authenticator.generateSecret();
//         const otpauth_url = authenticator.keyuri(user.email, process.env.APP_NAME, secret);
//         await this.usersService.setTwoFactorAuthenticationSecret(user.id, secret);
//         return { secret, otpauth_url };
//     }

//     async pipeQrCodeStream(stream: Response, otpauth_url: string) {
//         return toFileStream(stream, otpauth_url);
//     }
// }
