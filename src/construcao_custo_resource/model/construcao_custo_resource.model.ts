import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Construcao } from "src/construcoes/model/construcao.model";
import { Resource } from "src/resources/model/resource.model";

@Entity('construction_cost_resources')
export class ConstrucaoCustoResource extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Construcao, construcao => construcao.costs, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'construction_id' })
    construction: Construcao;

    @ManyToOne(() => Resource, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'resource_id' })
    resource: Resource;

    @Column({
        type: 'integer',
        nullable: false
    })
    amount: number;
}
