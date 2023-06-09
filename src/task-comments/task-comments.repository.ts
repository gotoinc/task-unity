import { Repository } from 'typeorm';
import { TaskEntity } from '../tasks/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskCommentDto } from './dto/request/create-task-comment.dto';
import { UserEntity } from '../users/user.entity';
import { TaskCommentEntity } from './task-comment.entity';

export class TaskCommentsRepository extends Repository<TaskCommentEntity> {
  constructor(
    @InjectRepository(TaskCommentEntity)
    private taskCommentsRepository: Repository<TaskCommentEntity>,
  ) {
    super(
      taskCommentsRepository.target,
      taskCommentsRepository.manager,
      taskCommentsRepository.queryRunner,
    );
  }

  async createTaskComment(
    dto: CreateTaskCommentDto,
    task: TaskEntity,
    user: UserEntity,
  ): Promise<TaskCommentEntity> {
    const { content } = dto;

    const taskComment = this.create({ content, task, createdBy: user });

    await this.save(taskComment);

    return taskComment;
  }
}
