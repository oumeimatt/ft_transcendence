import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "../players/player.entity";
import { RelationStatus } from "./relation_status.enum";

@Entity('relation')
export class Relation extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: RelationStatus;

    @Column()
    receiver: number;

    @ManyToOne(type => Player, player => player.senders)
    sender: Player;
}