import { room } from "./room.entity";
import { EntityRepository, Repository } from "typeorm";
import { RoomDto } from "./dto/room-dto";

import { memoryUsage } from "process";
import { membership } from "./membership.entity";
import { RoleStatus } from "./dto/membership.model";
import { Player } from "src/players/player.entity";

@EntityRepository(room)
export class roomRepository extends Repository<room>{

    async createRoom(RoomDto:RoomDto, creators : Player[]):Promise<room>{
        const {name,password} = RoomDto;

        const Room = new room();
        Room.name = name;
        Room.ischannel = true;
        if (password)
            Room.ispublic = false;
        Room.password = password;
        await Room.save();

        for (var user of creators)
        {
            const Membership = new membership();
            Membership.role = RoleStatus.USER;
            Membership.Player = user;
            Membership.room = Room;
            await Membership.save();
        }
        //update the last one to be the owner


        return Room;
    }

    async addMember(room:room,creator :Player, role:RoleStatus):Promise<void>{
        const Membership = new membership();
        Membership.role =role;
        Membership.Player = creator;
        Membership.room = room;
        await Membership.save();
    }
 
    async getRoomById(id:number):Promise<room>{
        const room = await this.findOne({id});
        return room;
    }

    async getRoomsForUser(Playerid:number):Promise<void>{
        //! The new query
        
        //select * from room where id IN (select roomid from membership where Playerid=Playerid)


       const query = await this.createQueryBuilder('membership')
       .where('name = :Playerid', {Playerid})
       console.log(await query.getMany());
      // const rooms = await query.getMany();

      // return rooms;

    }

    // async addUserToRoom(room:room, user:Player):Promise<room>{
    //     await room.Players.push(user);
    //     return room;
    // }

}
