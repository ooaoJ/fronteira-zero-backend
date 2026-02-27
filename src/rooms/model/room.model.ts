import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from "typeorm";
import { RoomPlayer } from "./room-player.model";

export enum RoomStatus {
    WAITING = 'WAITING',
    STARTED = 'STARTED',
    FINISHED = 'FINISHED'
}

export enum RoomMode {
    NORMAL = 'NORMAL',
    BLITZ = 'BLITZ'
}

@Entity('rooms')
export class Room extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'enum',
        enum: RoomMode,
        default: RoomMode.NORMAL
    })
    mode: RoomMode

    @Column({
        type: 'enum',
        enum: RoomStatus,
        default: RoomStatus.WAITING
    })
    status: RoomStatus

    @Column({ type: 'int', default: 20 })
    maxPlayers: number

    @CreateDateColumn()
    createdAt: Date

    @Column({ type: 'datetime', nullable: true })
    startedAt: Date | null

    @Column({ type: 'datetime', nullable: true })
    finishedAt: Date | null

    @OneToMany(() => RoomPlayer, (rp) => rp.room)
    players: RoomPlayer[]
}