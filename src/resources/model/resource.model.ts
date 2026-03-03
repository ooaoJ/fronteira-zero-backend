import { BaseEntity, Column } from "typeorm";

export class Resource extends BaseEntity {
    @Column({
        type: "varchar"
    })
    resource_name: string
}