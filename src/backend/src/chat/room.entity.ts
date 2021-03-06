
import { BaseEntity, Column, Entity,OneToMany, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn,  JoinTable} from "typeorm";
import { message } from "./message.entity";
import { membership } from "./membership.entity";

@Entity()
export class chatroom extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    name:string;

    @Column({default:true})
    ischannel:boolean;

    @Column({default:true})
    ispublic:boolean;

    @Column()//{select:false}
    password:string;

    @Column()
    salt:string;

    // @ManyToMany(()=>player)
    // @JoinTable()
    // players:player[];
    @OneToMany(()=>membership, membership=>membership.room)
    memberships:membership[];

    @OneToMany(()=>message, message=>message.room)
    messages:message[];
    
    @CreateDateColumn()
    create_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

}