import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { Room } from "./room.model";
import { User } from "../../users/model/user.model";

@Entity('room_players')
export class RoomPlayer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'uuid' })
    roomId: string

    @Column({ type: 'uuid' })
    userId: string

    @CreateDateColumn()
    joinedAt: Date

    @Column({ type: 'datetime', nullable: true })
    leftAt: Date | null

    @ManyToOne(() => Room, (room) => room.players, { onDelete: 'CASCADE' })
    room: Room

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User
}