import { BaseEntity, Column, Entity, JoinColumn, OneToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConstrucaoCustoResource } from "src/construcao_custo_resource/model/construcao_custo_resource.model";

enum statusType {
    DEFESA = 'defesa',
    ATAQUE = 'ataque',
}


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
        type: "json",
        nullable: true
    })
    efects: any[]

    @OneToMany(() => ConstrucaoCustoResource, construcaoCusto => construcaoCusto.construction)
    costs: ConstrucaoCustoResource[];

    @ManyToOne(() => Construcao, { nullable: true })
    @JoinColumn({ name: 'prerequisite_id' })
    prerequisite: Construcao

}