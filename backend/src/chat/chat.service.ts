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
import { memberDto } from './dto/member-dto';
import { RelationsService } from 'src/relations/relations.service';
import { RelationStatus } from 'src/relations/relation_status.enum';

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

        protected relationService:RelationsService
        
        
    ){

    }

    async createRoom(RoomDto:RoomDto, creators :Player[]):Promise<chatroom>{
        return await this.roomRepo.createRoom(RoomDto, creators);
    }

    async createDM(sender:number, receiver:number):Promise<chatroom>{
        
        const chatroom = await this.roomRepo.createDM(sender, receiver);
        let User = await this.userService.getUserById(sender);
        await this.addMember(chatroom, User, RoleStatus.USER);

        User = await this.userService.getUserById(receiver);
        await this.addMember(chatroom, User, RoleStatus.USER);
        return chatroom;
    }

    async getRoomById(id:number):Promise<chatroom>{
        return await this.roomRepo.getRoomById(id);
    }

    async getRoomByName(name:string):Promise<chatroom>{
        return await this.roomRepo.findOne({name:name});
    }
   

    async getMembersByRoomId(roomid:number, playerid:number):Promise<memberDto[]>{
        let membersObj : memberDto[] =[];
        if (await this.isMember(roomid, playerid))
        {

        const usersid = await this.membershipRepo
        .createQueryBuilder('m')
        .where('m.roomid = :roomid', { roomid })
        .select(['m.playerid', 'm.role'])
        .getMany();

        const members:Player[] = [];
        for (var id of usersid)
        {
            let memberObj = {member: await this.userService.getUserById(id.playerid), role : id.role}
            membersObj.push(memberObj);
           // console.log(memberObj.member.username);
        }
    }
        return membersObj; //maybe I should select only [id && username]
    }

    async getRoomsForUser(playerid:number):Promise<chatroom[]>{
        
       //! select * from room INNER JOIN membership ON (membership.Playerid=36 and room.id=membership.roomid);
        // const rooms = await this.roomRepo.createQueryBuilder('room')
        // .innerJoin('membership', 'room.id = membership.roomid')
        // .getMany();

        //where playerid == playerid && user is not banned !!
         const roomsid = await this.membershipRepo
        .createQueryBuilder('p')
        .where('p.playerid = :playerid', { playerid })
        .select(['p.roomid'])
        .getMany();
        //console.log('faiiiled !');

        let rooms = [];
    
        
        for (var id of roomsid)
            rooms.push(await this.roomRepo.getChatroomById(id.roomid));
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

    //Maybe I need to check if the user is member to this roomid before send

    async getMessagesByroomId(roomid:number, playerid:number):Promise<message[]>{ 

        let messages :message[] =[];
        if (await this.isMember(roomid, playerid))
        {
            const query = await this.messageRepo.createQueryBuilder('message')
            .select(['message.content','message.playerid', 'message.roomid'])
            .where("message.roomid = :roomid", {roomid})
            .orderBy("message.created_at");
            messages = await query.getMany();
        }
            return messages;
    }

    async getDMs(userid:number, receiverid:number):Promise<message[]>{
        
        //! check if player is blocked 
        let messages : message[]=[]

        if ( await this.relationService.checkBlock(userid, receiverid) == null)
        {
            let room =await this.getRoomByName(userid+":"+receiverid);
            if (!room)
                room = await this.getRoomByName(receiverid+":"+userid);
      

            if (room)
                messages = await this.getMessagesByroomId(room.id, userid);
            
        }
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
        .select(['chatroom.id', 'chatroom.name', 'chatroom.ispublic', 'chatroom.ischannel'])
        .getMany();
        
        //if the channel os private=>check if the user is a member
        let i = 0;
        while (i < rooms.length)
        {
            // console.log(rooms[1].name+" => "+rooms[1].ispublic)
            if (await rooms[i].ispublic == false && await this.isMember(rooms[i].id, playerid) === null)
            {
               // console.log(rooms[i].name +' is removed bcz private ');
               //if the user is a member check if he is banned !!
                rooms.splice(i , 1);
            }
            else
                i++;
        }
       // console.log(rooms);
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

    async createMembership(playerid:number, roomid:number){
        //before creating membership => check ppwd
        const Membership = new membership();
        Membership.playerid = playerid;
        Membership.roomid = roomid;
        Membership.role =   RoleStatus.USER;
        await Membership.save();
    }

    async DMexist(senderid:number, receiverid:number):Promise<chatroom>{
        let chatroomName = senderid+":"+receiverid;
        let room = await this.roomRepo.findOne({name:chatroomName, ischannel:false});
        if (room)
            return room;
        chatroomName = receiverid+":"+senderid;
        room = await this.roomRepo.findOne({name:chatroomName, ischannel:false});
        if (room)
            return room;
        return null;
    }

    /*
        set as admin
        remove admin
    */

    async updateMembership(playerid:number, roomid:number, role: RoleStatus):Promise<membership>{
        const membership = await this.membershipRepo.findOne({playerid:playerid, roomid:roomid});
        membership.role = role;
        await membership.save();
        return membership;
    }

    /*
        edit pwd == something different
        remove pwd == ''
    */
    async updatePassword(roomid:number, password:string):Promise<chatroom>{
        let room = await this.getRoomById(roomid);
        room.password = password;
        await room.save();

        return room;
    }


    
    async updateBanStatus(playerid:number, roomid:number, ban:boolean):Promise<membership>{
        const membership = await this.membershipRepo.findOne({playerid:playerid, roomid:roomid});
        membership.isbanned = ban; // true | false
        await membership.save();

        return membership;
    }
    

    /*
        

    */

}
