import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { PriorityEnum } from './priority.enum';
import { TaskCommentEntity } from '../task-comments/task-comment.entity';
import { CommonEntity } from '../common/entities/common.entity';

@Entity()
export class TaskEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.tasks, {
    eager: true,
  })
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.assignedTasks, {
    eager: true,
  })
  assignee: UserEntity;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: PriorityEnum,
    default: PriorityEnum.NO_PRIORITY,
  })
  priority: PriorityEnum;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dueDate: Date;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ type: 'text', array: true, default: [] })
  tags: string[];

  @OneToMany(() => TaskCommentEntity, (taskComment) => taskComment.task)
  comments: TaskCommentEntity[];
}
