import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskCommentsRepository } from './task-comments.repository';
import { TaskCommentEntity } from './task-comment.entity';
import { TasksService } from '../tasks/tasks.service';
import { CreateTaskCommentDto } from './dto/request/create-task-comment.dto';
import { UserEntity } from '../users/user.entity';
import { UpdateTaskCommentDto } from './dto/request/update-task-comment.dto';

@Injectable()
export class TaskCommentsService {
  constructor(
    private taskCommentsRepository: TaskCommentsRepository,
    private tasksService: TasksService,
  ) {}

  async createTaskComment(
    dto: CreateTaskCommentDto,
    taskId: number,
    user: UserEntity,
  ): Promise<TaskCommentEntity> {
    const task = await this.tasksService.getTaskById(taskId);

    const { id } = await this.taskCommentsRepository.createTaskComment(
      dto,
      task,
      user,
    );

    const taskComment = await this.getTaskCommentById(id);

    return taskComment;
  }

  async getTaskCommentById(taskCommentId: number): Promise<TaskCommentEntity> {
    const taskComment = await this.taskCommentsRepository.findOneBy({
      id: taskCommentId,
    });

    if (!taskComment) {
      throw new NotFoundException(
        `Task comment with id ${taskCommentId} not found`,
      );
    }

    return taskComment;
  }

  async getTaskComments(taskId: number): Promise<TaskCommentEntity[]> {
    const task = await this.tasksService.getTaskById(taskId);

    const taskComments = await this.taskCommentsRepository.findBy({
      task: {
        id: task.id,
      },
    });

    return taskComments;
  }

  async updateTaskComment(
    taskCommentId: number,
    dto: UpdateTaskCommentDto,
  ): Promise<TaskCommentEntity> {
    const taskComment = await this.getTaskCommentById(taskCommentId);

    taskComment.content = dto.content;

    await this.taskCommentsRepository.save(taskComment);

    return taskComment;
  }

  async deleteTaskComment(taskCommentId: number): Promise<void> {
    const result = await this.taskCommentsRepository.delete(taskCommentId);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Task comment with id ${taskCommentId} not found`,
      );
    }
  }
}
