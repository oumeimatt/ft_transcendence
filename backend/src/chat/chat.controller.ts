import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { timeStamp } from 'console';
import { query } from 'express';
import { get } from 'http';
import { Player } from 'src/players/player.entity';

import { ChatService } from './chat.service';
import { RoomDto } from './dto/room-dto';
import { message } from './gateway/message.entity';
import { room } from './room.entity';


@Controller('chat')
export class ChatController {
    constructor( private chatService:ChatService){}

    @Get('messages')
    getAllMessageByRoomId(@Query('roomid') roomid:number):Promise<message[]>{
        return this.chatService.getMessagesByroomId(roomid);   
    }


    @Get('rooms')
    getRoomsByUserId(@Query('playerid') playerid:number):Promise<room[]>{
        return this.chatService.getRoomsForUser(playerid);
    }

    @Get('members')
    getMembersByRoomId(@Query('roomid') roomid:number):Promise<Player[]>{
        return this.chatService.getMembersByRoomId(roomid);
    }
    

    

}
