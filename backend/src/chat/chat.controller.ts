import { Body, Controller, Get, Header, Param, Post, Query } from '@nestjs/common';
import { timeStamp } from 'console';
import { query } from 'express';
import { get } from 'http';
import { Player } from 'src/players/player.entity';
import { QueryResult } from 'typeorm';

import { ChatService } from './chat.service';
import { memberDto } from './dto/member-dto';
import { RoomDto } from './dto/room-dto';
import { membership } from './membership.entity';
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

    @Get('DM')
    getMessages(@Query('userid') userid:number, @Query('receiverid') receiverid:number):Promise<message[]>{
        return this.chatService.getDMs(userid, receiverid);
    }

    //display usernnames => return playerid to the server-side
    @Get('members') //I should add role for each members =>  add to socket
    getMembersByRoomId(@Query('roomid') roomid:number):Promise<memberDto[]>{ 
        return this.chatService.getMembersByRoomId(roomid);
    }

    //Get role
    // @Get('role') //!!!! No overload matches this call
    // getRole(@Query('roomid', 'playerid') roomid:number, playerid:number){
    //     return this.chatService.getRole(roomid, playerid);
    // }
    
    @Get('mychannels') //make sure that are channels && not DM
    getRoomsByUserId(@Query('playerid') playerid:number):Promise<chatroom[]>{
        return this.chatService.getRoomsForUser(playerid);
    }

    @Get('allchannels')//make sure that are channels && not DM
    getAllRooms(@Query('playerid') playerid:number) :Promise<chatroom[]>{
        return this.chatService.getAllRooms(playerid);
    }

    @Get('isMember')
    getMembership(@Query('roomid') roomid:number, @Query('playerid') playerid:number):Promise<membership>{
        return this.chatService.isMember(roomid, playerid);
    }
}
