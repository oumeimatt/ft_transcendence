import { Player } from 'src/players/player.entity';
import { ChatService } from './chat.service';
import { membership } from './membership.entity';
import { message } from './message.entity';
import { chatroom } from './room.entity';
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    getAllMessageByRoomId(roomid: number): Promise<message[]>;
    getMembersByRoomId(roomid: number): Promise<Player[]>;
    getRoomsByUserId(playerid: number): Promise<chatroom[]>;
    getAllRooms(playerid: number): Promise<chatroom[]>;
    isMember(roomid: number, playerid: number): Promise<membership>;
}
