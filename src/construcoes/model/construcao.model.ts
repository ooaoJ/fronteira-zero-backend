import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Resource } from "src/resources/model/resource.model";

@Entity('constructions')
export class Construcao extends BaseEntity {
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

    @ManyToMany(() => Resource)
    @JoinTable({
        name: 'construction_resources',
        joinColumn: { name: 'construction_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'resource_id', referencedColumnName: 'id' }
    })
    resources: Resource

    @Column({
        type: 'integer',
        nullable: false
    })
    cost: number

    @ManyToOne(() => Construcao, { nullable: true })
    @JoinColumn({ name: 'prerequisite_id' })
    prerequisite: Construcao

}