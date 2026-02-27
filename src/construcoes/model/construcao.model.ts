import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export class Contrucao extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    name: string

    
}