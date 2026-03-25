import { RoomPlayer } from "src/rooms/model/room-player.model";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('room_player_stats')
@Unique(['room_player_id'])
export class RoomPlayerStats {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => RoomPlayer)
    @JoinColumn({ name: 'room_player_id' })
    room_player: RoomPlayer

    @Column({
        type: "int",
        default: 0
    })
    horders_faced: number

    @Column({
        type: "float",
        default: 0,
        nullable: false
    })
    def: number

    @Column({
        type: "float",
        default: 0,
        nullable: false
    })
    atk: number

    @Column({
        type: "float",
        default: 0
    })
    noise: number
}