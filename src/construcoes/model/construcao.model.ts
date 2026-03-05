import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('constructions')
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
        type: 'float',
        nullable: false
    })
    base_life: number
    
    @Column({
        type: 'float',
        nullable: false
    })
    base_atk: number

    @Column({
        type: 'float',
        nullable: false
    })
    base_def: number

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

    @Column({
        type: "varchar",
        nullable: true
    })
    efect: string

    @ManyToOne(() => Construcao, {nullable: true})
    @JoinColumn({name: 'prerequisite_id'})
    prerequisite: Construcao

}