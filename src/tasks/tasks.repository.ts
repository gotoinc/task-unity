import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/request/create-task.dto';
import { UserEntity } from '../users/user.entity';
import { Injectable } from '@nestjs/common';

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

  async getTasks(user: UserEntity): Promise<TaskEntity[]> {
    const query = this.createQueryBuilder('task');

    query
      .leftJoinAndSelect('task.assignee', 'assignee')
      .where({ createdBy: user });

    return query.getMany();
  }
}
