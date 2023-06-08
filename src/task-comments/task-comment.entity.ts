import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskEntity } from '../tasks/task.entity';
import { UserEntity } from '../users/user.entity';

@Entity()
export class TaskCommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TaskEntity, (task) => task.comments)
  task: TaskEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments, {
    eager: true,
  })
  createdBy: UserEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column()
  content: string;
}
