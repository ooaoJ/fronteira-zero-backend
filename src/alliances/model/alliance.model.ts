import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AllianceMember } from './alliance-member.model';
import { AllianceMessage } from './alliance-message.model';

@Entity('alliances')
export class Alliance extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 60, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 8, unique: true, nullable: true })
  tag: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => AllianceMember, (m) => m.alliance)
  members: AllianceMember[];

  @OneToMany(() => AllianceMessage, (msg) => msg.alliance)
  messages: AllianceMessage[];
}