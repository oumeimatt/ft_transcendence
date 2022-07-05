import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from "./jwt-payload.interface";
import { PlayerRepository } from "../players/player.repository";
import { Player } from "../players/player.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(PlayerRepository)
        private playerRepository: PlayerRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'pingpong',
        });
    }

    async validate(payload: JwtPayload): Promise<Player> {
        const { username } = payload;
        const user = await this.playerRepository.findOne({username});
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}