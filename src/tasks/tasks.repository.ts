import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/request/create-task.dto';
import { UserEntity } from '../users/user.entity';
import { Injectable } from '@nestjs/common';
import { GetTasksDto } from './dto/request/get-tasks.dto';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { GetTasksResponseDto } from './dto/response/get-tasks-response.dto';

@Injectable()
export class TasksRepository extends Repository<TaskEntity> {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {
    super(
      tasksRepository.target,
      tasksRepository.manager,
      tasksRepository.queryRunner,
    );
  }

  async createTask(dto: CreateTaskDto, user: UserEntity): Promise<TaskEntity> {
    const task = this.create({
      ...dto,
      createdBy: user,
    });

    await this.save(task);

    return task;
  }

  async getTasks(
    user: UserEntity,
    dto: GetTasksDto,
    options: IPaginationOptions,
  ): Promise<GetTasksResponseDto> {
    const queryBuilder = this.createQueryBuilder('task');

    queryBuilder.where('task.createdBy.id = :userId', { userId: user.id });
    queryBuilder.orderBy(`task.${dto.sort}`, dto.order);

    return paginate(queryBuilder, options);
  }
}
