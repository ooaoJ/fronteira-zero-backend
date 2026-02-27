import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Alliance } from './alliance.model';
import { User } from '../../users/model/user.model';

export enum AllianceRole {
  LEADER = 'LEADER',
  MEMBER = 'MEMBER',
}

@Entity('alliance_members')
@Index(['allianceId', 'userId'], { unique: true })
@Index(['userId'], { unique: true }) // ✅ 1 aliança por usuário (MVP)
export class AllianceMember extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  allianceId: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'enum', enum: AllianceRole, default: AllianceRole.MEMBER })
  role: AllianceRole;

  @CreateDateColumn()
  joinedAt: Date;

  @ManyToOne(() => Alliance, (a) => a.members, { onDelete: 'CASCADE' })
  alliance: Alliance;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;
}