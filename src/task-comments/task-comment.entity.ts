import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskEntity } from '../tasks/task.entity';
import { UserEntity } from '../users/user.entity';

@Entity()
export class TaskCommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  task: TaskEntity;

  @Column()
  createdBy: UserEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column()
  content: string;
}
