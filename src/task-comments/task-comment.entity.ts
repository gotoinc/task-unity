import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from '../tasks/task.entity';
import { UserEntity } from '../users/user.entity';
import { CommonEntity } from '../common/entities/common.entity';

@Entity()
export class TaskCommentEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TaskEntity, (task) => task.comments)
  task: TaskEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments, {
    eager: true,
  })
  createdBy: UserEntity;

  @Column()
  content: string;
}
