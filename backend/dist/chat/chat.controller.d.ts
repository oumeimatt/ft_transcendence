import { Player } from 'src/players/player.entity';
import { ChatService } from './chat.service';
import { message } from './gateway/message.entity';
import { room } from './room.entity';
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    getAllMessageByRoomId(roomid: number): Promise<message[]>;
    getRoomsByUserId(playerid: number): Promise<room[]>;
    getMembersByRoomId(roomid: number): Promise<Player[]>;
}
