import { Repository } from 'typeorm';
import { TaskEntity } from '../tasks/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskCommentDto } from './dto/request/create-task-comment.dto';
import { UserEntity } from '../users/user.entity';
import { TaskCommentEntity } from './task-comment.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { GetTaskCommentsDto } from './dto/request/get-task-comments.dto';
import { GetTaskCommentsResponseDto } from './dto/response/get-task-comments-response.dto';

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

  async getTaskComments(
    task: TaskEntity,
    dto: GetTaskCommentsDto,
    options: IPaginationOptions,
  ): Promise<GetTaskCommentsResponseDto> {
    const queryBuilder = this.createQueryBuilder('task-comment');

    queryBuilder.where('task-comment.task.id = :taskId', { taskId: task.id });
    queryBuilder.orderBy(`task-comment.${dto.sort}`, dto.order);

    return paginate(queryBuilder, options);
  }
}
