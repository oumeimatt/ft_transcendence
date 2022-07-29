import { ChatService } from './chat.service';
import { memberDto } from './dto/member-dto';
import { membership } from './membership.entity';
import { message } from './message.entity';
import { chatroom } from './room.entity';
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    getAllMessageByRoomId(roomid: number, playerid: number): Promise<message[]>;
    getMessages(userid: number, receiverid: number): Promise<message[]>;
    getMembersByRoomId(roomid: number, playerid: number): Promise<memberDto[]>;
    getRoomsByUserId(playerid: number): Promise<chatroom[]>;
    getAllRooms(playerid: number): Promise<chatroom[]>;
    getMembership(roomid: number, playerid: number): Promise<membership>;
}
