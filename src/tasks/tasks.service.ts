import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/request/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { UserEntity } from '../users/user.entity';
import { TaskEntity } from './task.entity';
import { UpdateTaskDto } from './dto/request/update-task.dto';
import { UpdateTaskStatusDto } from './dto/request/update-task-status.dto';
import { AssignTaskDto } from './dto/request/assign-task.dto';
import { UsersService } from '../users/users.service';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { GetTasksDto } from './dto/request/get-tasks.dto';
import { GetTasksResponseDto } from './dto/response/get-tasks-response.dto';

@Injectable()
export class TasksService {
  constructor(
    private tasksRepository: TasksRepository,
    private usersService: UsersService,
  ) {}

  async createTask(dto: CreateTaskDto, user: UserEntity): Promise<TaskEntity> {
    return this.tasksRepository.createTask(dto, user);
  }

  async getTaskById(id: number): Promise<TaskEntity> {
    const task = await this.tasksRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }

    return task;
  }

  async getTasks(
    user: UserEntity,
    dto: GetTasksDto,
    options: IPaginationOptions,
  ): Promise<GetTasksResponseDto> {
    return this.tasksRepository.getTasks(user, dto, options);
  }

  async updateTask(dto: UpdateTaskDto, id: number): Promise<TaskEntity> {
    const task = await this.getTaskById(id);
    const { description, title } = dto;

    this.tasksRepository.merge(task, { description, title });

    await this.tasksRepository.save(task);

    return task;
  }

  async updateTaskCompletion(
    dto: UpdateTaskStatusDto,
    id: number,
  ): Promise<TaskEntity> {
    const task = await this.getTaskById(id);

    task.isCompleted = dto.isCompleted;

    await this.tasksRepository.save(task);

    return task;
  }

  async assignTask(dto: AssignTaskDto, id: number): Promise<TaskEntity> {
    const task = await this.getTaskById(id);

    if (dto.userId) {
      const user = await this.usersService.getUserById(dto.userId);

      task.assignee = user;
    } else {
      task.assignee = null;
    }

    await this.tasksRepository.save(task);

    return task;
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }
  }
}
