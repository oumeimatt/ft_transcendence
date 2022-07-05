import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { PlayerModule } from './players/players.module';
import { RelationModule } from './relations/relations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    PlayerModule,
    RelationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}