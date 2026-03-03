import { BaseEntity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Construcao extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    name: string

    @Column({
        type: 'integer',
        nullable: false
    })
    base_life: number
    
    @Column({
        type: 'integer',
        nullable: false
    })
    construction_time: number

    @Column({
        type: 'integer',
        nullable: true
    })
    base_noise: number

    @ManyToOne(() => Construcao, {nullable: true})
    @JoinColumn({name: 'prerequisite_id'})
    prerequisite: Construcao

    @Column({
        type: 'varchar'
    })
    prerequisite_id: string

}