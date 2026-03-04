import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('resources')
export class Resource extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column({
        type: "varchar"
    })
    resource_name: string
}