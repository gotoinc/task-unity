import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { Reflector } from '@nestjs/core';
import { taskIdMetadataKey } from './task-id-param-key.decorator';

@Injectable()
export class TaskBelongingGuard implements CanActivate {
  constructor(
    private tasksRepository: TasksRepository,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const taskIdParamKey = this.reflector.get<string>(
      taskIdMetadataKey,
      context.getClass(),
    );

    const taskId = request.params[taskIdParamKey];

    if (!taskId) {
      return true;
    }

    const { id: userId } = request.user;

    const task = await this.tasksRepository.findOneBy({
      id: taskId,
      createdBy: { id: userId },
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }

    return true;
  }
}
