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

@Entity('alliance_messages')
@Index(['allianceId', 'createdAt'])
export class AllianceMessage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  allianceId: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'varchar', length: 400 })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Alliance, { onDelete: 'CASCADE' })
  alliance: Alliance;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;
}