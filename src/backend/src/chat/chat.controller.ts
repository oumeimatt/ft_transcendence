import { Body, Controller, Get, Header, Param, Post, Query, Req, UnauthorizedException } from '@nestjs/common';
import { timeStamp } from 'console';
import { query, request } from 'express';
import { get } from 'http';
import { Player } from 'src/players/player.entity';
import { UsersService } from 'src/players/players.service';
import { QueryResult } from 'typeorm';

import { ChatService } from './chat.service';
import { memberDto } from './dto/member-dto';
import { RoomDto } from './dto/room-dto';
import { membership } from './membership.entity';
import { message } from './message.entity';
import { chatroom } from './room.entity';
import { Request, Express } from "express";
import { MESSAGES } from '@nestjs/core/constants';



@Controller('chat')
export class ChatController {
    constructor( private chatService:ChatService,private usersService: UsersService){}
  

    @Get('messages') 
    async getAllMessageByRoomId(@Req() req: Request,
        @Query('roomid') roomid:number, @Query('playerid') playerid:number) :Promise<message[]>{
            let messages :message[] = [];
            try{
                
                let user = await this.usersService.verifyToken(req.cookies.connect_sid);
                messages = await this.chatService.getMessagesByroomId(roomid, playerid);
                return messages;
            }
            catch{throw new UnauthorizedException();}   
    }

    @Get('DM')
    async getMessages(@Req() req: Request,
        @Query('userid') userid:number, @Query('receiverid') receiverid:number):Promise<message[]>{
            let dms :message[] = [];
            try{
                let user = await this.usersService.verifyToken(req.cookies.connect_sid);
                let dms =await this.chatService.getDMs(userid, receiverid);
                return dms;

            }catch{throw new UnauthorizedException();}
        
    }

    //display usernnames => return playerid to the server-side
    @Get('members') //I should add role for each members =>  add to socket
    async getMembersByRoomId(@Req() req: Request,
        @Query('roomid') roomid:number, @Query('playerid') playerid:number):Promise<memberDto[]>{ 
            let members : memberDto[] =[];
            try{
                let user = await this.usersService.verifyToken(req.cookies.connect_sid);
                members = await this.chatService.getMembersByRoomId(roomid, playerid);
                return members;

            }catch{throw new UnauthorizedException();}
        return 
    }

    //Get role
    // @Get('role') //!!!! No overload matches this call
    // getRole(@Query('roomid', 'playerid') roomid:number, playerid:number){
    //     return this.chatService.getRole(roomid, playerid);
    // }
    
    @Get('mychannels') //make sure that are channels && not DM
    async getRoomsByUserId(@Req() req: Request,
        @Query('playerid') playerid:number):Promise<chatroom[]>{
        let chatroom : chatroom[]=[];
        try{
            let user = await this.usersService.verifyToken(req.cookies.connect_sid);
            chatroom = await this.chatService.getRoomsForUser(playerid);
            return chatroom;
        }catch{throw new UnauthorizedException();}
    }

    @Get('allchannels')//make sure that are channels && not DM
    async getAllRooms(@Req() req: Request,
        @Query('playerid') playerid:number) :Promise<chatroom[]>{
            let rooms :chatroom[] =[]
            try{
                let user = await this.usersService.verifyToken(req.cookies.connect_sid);
                rooms = await this.chatService.getAllRooms(playerid);
                return rooms;
            }catch{throw new UnauthorizedException();}
    }

    @Get('isMember')
    async getMembership(@Req() req: Request,
        @Query('roomid') roomid:number, @Query('playerid') playerid:number):Promise<membership>{
            let membership;
            try{
                let user = await this.usersService.verifyToken(req.cookies.connect_sid);
                membership = await this.chatService.getMembership(roomid, playerid);
                return membership;
            }catch{throw new UnauthorizedException();}
    }
}
