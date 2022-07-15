import { Body, Controller, Get, Header, Param, Post, Query } from '@nestjs/common';
import { timeStamp } from 'console';
import { query } from 'express';
import { get } from 'http';
import { Player } from 'src/players/player.entity';

import { ChatService } from './chat.service';
import { RoomDto } from './dto/room-dto';
import { message } from './message.entity';
import { chatroom } from './room.entity';


@Controller('chat')
export class ChatController {
    constructor( private chatService:ChatService){}

    @Get('messages')
    @Header('Access-Control-Allow-Origin', 'http://localhost:3000')
    @Header('Access-Control-Allow-Credentials', 'true')
    getAllMessageByRoomId(@Query('roomid') roomid:number):Promise<message[]>{
        return this.chatService.getMessagesByroomId(roomid);   
    }

    

    @Get('rooms')
    @Header('Access-Control-Allow-Origin', 'http://localhost:3000')
    @Header('Access-Control-Allow-Credentials', 'true')
    getRoomsByUserId(@Query('playerid') playerid:number):Promise<chatroom[]>{
        return this.chatService.getRoomsForUser(playerid);
    }

    @Get('members')
    @Header('Access-Control-Allow-Origin', 'http://localhost:3000')
    @Header('Access-Control-Allow-Credentials', 'true')
    getMembersByRoomId(@Query('roomid') roomid:number):Promise<Player[]>{
        return this.chatService.getMembersByRoomId(roomid);
    }
    

    

}
