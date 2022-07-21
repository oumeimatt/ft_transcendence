import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerRepository } from '../players/player.repository';
import { PlayerModule } from '../players/players.module';
import { UsersService } from '../players/players.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { TwoFactorAuthenticationService } from './two-factor-authentication.service';
// import { TwoFactorAuthenticationService } from './two-factor-authentication.service';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: 'pingpong',
			signOptions: {
				expiresIn: '1d',
			},
		}),
		TypeOrmModule.forFeature([PlayerRepository]),
		PlayerModule,
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		UsersService,
		// TwoFactorAuthenticationService,
	],
	exports: [AuthService, UsersService]//, TwoFactorAuthenticationService]
})
export class AuthModule {}
