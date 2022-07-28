import { chatroom } from "./room.entity";
import { EntityRepository, Repository } from "typeorm";
import { RoomDto } from "./dto/room-dto";

import { memoryUsage } from "process";
import { membership } from "./membership.entity";
import { RoleStatus } from "./dto/membership.model";
import { Player } from "src/players/player.entity";
import * as bcrypt from 'bcrypt';

@EntityRepository(chatroom)
export class roomRepository extends Repository<chatroom>{

    async createRoom(RoomDto:RoomDto, creators : Player[]):Promise<chatroom>{
        const {name,privacy,password} = RoomDto;

        const Room = new chatroom();
        Room.name = name;
        Room.ischannel = true;
        if (privacy === 'Private')
            Room.ispublic = false;
        //hash this password
        Room.salt = await bcrypt.genSalt();
        Room.password = await bcrypt.hash(password, Room.salt);
        await Room.save();

        for (var user of creators)
        {
            const Membership = new membership();
            Membership.role = RoleStatus.USER;
            Membership.Player = user;
            Membership.room = Room;
            Membership.isbanned = false;
            Membership.ismuted = false;
            await Membership.save();
        }
        //update the last one to be the owner => already done in chhat gateway


        return Room;
    }

    async createDM(sender:number , receiver:number):Promise<chatroom>{
        const DM = new chatroom();

        DM.name = sender+":"+receiver;
        DM.ischannel = false;
        DM.password='';
        DM.ispublic = false;
        
        await DM.save();

        return DM;
    }

    async addMember(room:chatroom,creator :Player, role:RoleStatus):Promise<void>{
        const Membership = new membership();
        Membership.role =role;
        Membership.Player = creator;
        Membership.room = room;
         Membership.ismuted = false;
        Membership.isbanned = false;
        await Membership.save();
    }
 
    async getRoomById(id:number):Promise<chatroom>{
        const room = await this.findOne({id});
        return room;
    }

    async getChatroomById(id:number):Promise<chatroom>{
        const room = await this.createQueryBuilder('room')
        .where('room.id = :id', {id})
        .select(['room.id', 'room.name', 'room.ispublic', 'room.ischannel'])
        .getOne();
        
        return room;

    }

}
