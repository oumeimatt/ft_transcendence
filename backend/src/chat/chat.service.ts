import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { roomRepository } from './room.repository';
import { RoomDto } from './dto/room-dto';
import { chatroom } from './room.entity';
import { membership } from './membership.entity';
import { Repository } from 'typeorm';
import { RoleStatus } from './dto/membership.model';
import {  message } from './message.entity';
import { messageDto } from './dto/message-dto';
import { AuthService } from 'src/auth/auth.service';
import { In } from 'typeorm';
import { PlayerRepository } from 'src/players/player.repository';
import { UsersService } from 'src/players/players.service';
import { Player } from 'src/players/player.entity';
import { Room } from 'src/pong-game/typeorm/room.entity';
@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(roomRepository)
        protected roomRepo : roomRepository,

        @InjectRepository(membership)
        protected membershipRepo:Repository<membership>,

        @InjectRepository(message)
        protected messageRepo:Repository<message>,

        protected authService:AuthService,

        @InjectRepository(PlayerRepository)
        protected PlayerRepository:PlayerRepository,

       protected userService:UsersService,
        
        
    ){

    }
    async createRoom(RoomDto:RoomDto, creators :Player[]):Promise<chatroom>{
        return await this.roomRepo.createRoom(RoomDto, creators);
    }

    async getRoomById(id:number):Promise<chatroom>{
        return await this.roomRepo.getRoomById(id);
    }
   

    async getMembersByRoomId(roomid:number):Promise<Player[]>{
        const usersid = await this.membershipRepo
        .createQueryBuilder('m')
        .where('m.roomid = :roomid', { roomid })
        .select(['m.playerid'])
        .getMany();

        const members:Player[] = [];
        for (var id of usersid)
            members.push(await this.userService.getUserById(id.playerid));
        return members;
    }

    async getRoomsForUser(playerid:number):Promise<chatroom[]>{
        
       //! select * from room INNER JOIN membership ON (membership.Playerid=36 and room.id=membership.roomid);
        // const rooms = await this.roomRepo.createQueryBuilder('room')
        // .innerJoin('membership', 'room.id = membership.roomid')
        // .getMany();

         const roomsid = await this.membershipRepo
        .createQueryBuilder('p')
        .where('p.playerid = :playerid', { playerid })
        .select(['p.roomid'])
        .getMany();
        //console.log('faiiiled !');

        let rooms = [];
    
        
        for (var id of roomsid)
            rooms.push(await this.getRoomById(id.roomid));
        return rooms;
    }

    
    async addMember(room:chatroom, creator:Player, role:RoleStatus):Promise<void>{
        return await this.roomRepo.addMember(room, creator, role);
    }

    async createMessage(messageDto:messageDto, sender:Player):Promise<message>{
        const {id, content} = messageDto;
        const Message = new message();
        Message.content = content;
        Message.Player = sender;
        Message.room = await await this.getRoomById(id);
        await Message.save();

        return Message;
    }

    async getMessagesByroomId(roomid:number):Promise<message[]>{
       const query = await this.messageRepo.createQueryBuilder('message')
        .select(['message.content','message.playerid'])
        .where("message.roomid = :roomid", {roomid})
        .orderBy("message.created_at");

       const messages = await query.getMany();
   //    console.log(messages);
       return messages;
    }

    async deleteMmebership(roomid :number, playrid:number){
        await this.membershipRepo.delete(
            {playerid:playrid,roomid:roomid});
    }

    async isMember(roomid:number, playerid:number):Promise<membership>{

        const membership = await this.membershipRepo.findOne({playerid, roomid});
        if (membership)
            return membership
        return null;
    }

    async getAllRooms(playerid:number):Promise<chatroom[]>{
        
        //The public && private ones
        const rooms = await this.roomRepo.createQueryBuilder('chatroom')
        .getMany();
        
        //if the channel os private=>check if the user is a member
        for (let i = 0; i < rooms.length; i++)
        {
            if (rooms[i].ispublic === false && await this.isMember(rooms[i].id, playerid) === null)
                rooms.splice(i , 1);
        }
        console.log(rooms);
        return rooms;
    }

    async getRole(roomid:number, playerid:number) :Promise<membership>{
        const role = await this.membershipRepo.createQueryBuilder('m')
        .where('m.playerid = :playerid', { playerid })
        .andWhere('m.roomid = :roomid', {roomid})
        .select('m.role')
        .getOne();
        return role;
    }

    //joinChannel

}
