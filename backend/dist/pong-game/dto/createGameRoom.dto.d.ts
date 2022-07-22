import { GameMood } from '../interfaces';
export declare class CreateGameRoomDto {
    roomname: string;
    difficulty: GameMood;
    player1: string;
    player2: string;
}
