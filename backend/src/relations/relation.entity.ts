import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "../players/player.entity";
import { RelationStatus } from "./relation_status.enum";

@Entity('relation')
export class Relation extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: RelationStatus;

    // @ManyToOne(type => Player, player => player.receivers)
    // receiver: Player;
    @Column()
    receiver: number;

    @ManyToOne(type => Player, player => player.senders)
    sender: Player;
}