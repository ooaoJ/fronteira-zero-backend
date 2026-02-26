import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    name: string

    @Column({
        type: 'varchar',
        length: 200,
        nullable: false,
        unique: true
    })
    email: string

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    password: string

    @Column({
        type: 'int',
        default: 1
    })
    level: number

    @Column({
        type: 'int',
        default: 0
    })
    wins: number

    @Column({
        type: 'int',
        default: 0
    })
    hordesDefeated: number
}