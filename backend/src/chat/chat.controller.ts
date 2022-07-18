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

    // value returned content && playerid
    @Get('messages') 
    getAllMessageByRoomId(@Query('roomid') roomid:number):Promise<message[]>{
        return this.chatService.getMessagesByroomId(roomid);   
    }

    //display usernnames => return playerid to the server-side
    @Get('members')
    getMembersByRoomId(@Query('roomid') roomid:number):Promise<Player[]>{
        return this.chatService.getMembersByRoomId(roomid);
    }

    //Get role
    // @Get('role') //!!!! No overload matches this call
    // getRole(@Query('roomid', 'playerid') roomid:number, playerid:number){
    //     return this.chatService.getRole(roomid, playerid);
    // }
    
    @Get('mychannels')
    getRoomsByUserId(@Query('playerid') playerid:number):Promise<chatroom[]>{
        return this.chatService.getRoomsForUser(playerid);
    }

    @Get('allchannels')
    getAllRooms(@Query('playerid') playerid:number) :Promise<chatroom[]>{
        return this.chatService.getAllRooms(playerid);
    }
}
