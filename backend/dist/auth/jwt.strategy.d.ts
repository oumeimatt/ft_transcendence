import { JwtPayload } from "./jwt-payload.interface";
import { PlayerRepository } from "../players/player.repository";
import { Player } from "../players/player.entity";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private playerRepository;
    constructor(playerRepository: PlayerRepository);
    validate(payload: JwtPayload): Promise<Player>;
}
export {};
