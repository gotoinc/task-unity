import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { TaskEntity } from '../tasks/task.entity';
import { TaskCommentEntity } from '../task-comments/task-comment.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToMany(() => TaskEntity, (task) => task.createdBy)
  tasks: TaskEntity[];

  @OneToMany(() => TaskEntity, (task) => task.assignee)
  assignedTasks: TaskEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  registerDate: Date;

  @OneToMany(() => TaskCommentEntity, (comment) => comment.createdBy)
  comments: TaskCommentEntity[];
}
