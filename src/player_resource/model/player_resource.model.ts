import { flatten, Injectable } from "@nestjs/common";
import { Resource } from "src/resources/model/resource.model";
import { RoomPlayer } from "src/rooms/model/room-player.model";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Injectable()
@Entity('player_resource')
@Unique('UQ_player_resource', ['roomPlayer', 'resouerce'])
export class PlayerResource {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => RoomPlayer, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: 'roomPlayerId' })
    roomPlayer: RoomPlayer

    @ManyToOne(() => Resource, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: 'resourceId' })
    resouerce: Resource

    @Column({
        type: "float",
        nullable: false
    })
    amount: number
}