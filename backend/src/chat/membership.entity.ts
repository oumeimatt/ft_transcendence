
import { Player } from "src/players/player.entity";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn,ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn,  JoinTable, JoinColumn} from "typeorm";
import { RoleStatus } from "./dto/membership.model";
import { chatroom } from "./room.entity";

@Entity()
export class membership extends BaseEntity{

    @PrimaryGeneratedColumn()
    id_membership:number;

    @Column()
    role:RoleStatus;

    @Column({ name: 'playerid' })
    playerid: number;

    @ManyToOne(()=> Player, Player=>Player.memberships)
    @JoinColumn({ name: "playerid" })
    Player: Player;

    @Column({ name: 'roomid' })
    roomid: number;
    
    @ManyToOne(()=> chatroom, room=>room.memberships)
    @JoinColumn({ name:"roomid"})
    room:chatroom;
}