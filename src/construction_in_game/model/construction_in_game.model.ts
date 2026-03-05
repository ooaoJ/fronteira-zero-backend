import { Construcao } from "src/construcoes/model/construcao.model";
import { RoomPlayer } from "src/rooms/model/room-player.model";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum Status {
    PENDING = "pending",
    BUILDING = "building",
    BUILT = "built",
    DAMAGED = "damaged"
}

@Entity('constructions_in_game')
export class ConstructionInGame {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Construcao, {nullable: false})
    @JoinColumn({name: "contruction_id"})
    constructionBluePrint: Construcao

    @ManyToOne(() => RoomPlayer, {nullable: false})
    @JoinColumn({name: "roomPlayerId"})
    roomPlayer: RoomPlayer

    @Column({
        type: "float",
        nullable: false
    })
    current_life: number

    @Column({
        type: "float",
        nullable: true
    })
    current_atk: number

    @Column({
        type: "enum",
        enum: Status,
        nullable: false,
        default: Status.BUILDING
    })
    status: Status

    @Column({
        type: "float",
        nullable: true
    })
    current_def: number
}