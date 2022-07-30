import { UsersService } from 'src/players/players.service';
import { ChatService } from './chat.service';
import { memberDto } from './dto/member-dto';
import { membership } from './membership.entity';
import { message } from './message.entity';
import { chatroom } from './room.entity';
import { Request } from "express";
export declare class ChatController {
    private chatService;
    private usersService;
    constructor(chatService: ChatService, usersService: UsersService);
    getAllMessageByRoomId(req: Request, roomid: number, playerid: number): Promise<message[]>;
    getMessages(req: Request, userid: number, receiverid: number): Promise<message[]>;
    getMembersByRoomId(req: Request, roomid: number, playerid: number): Promise<memberDto[]>;
    getRoomsByUserId(req: Request, playerid: number): Promise<chatroom[]>;
    getAllRooms(req: Request, playerid: number): Promise<chatroom[]>;
    getMembership(req: Request, roomid: number, playerid: number): Promise<membership>;
}
