import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TaskCommentsRepository } from './task-comments.repository';
import { Reflector } from '@nestjs/core';
import { taskCommentIdMetadataKey } from './task-comment-id-param-key.decorator';

@Injectable()
export class TaskCommentBelongingGuard implements CanActivate {
  constructor(
    private taskCommentsRepository: TaskCommentsRepository,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const taskCommentIdParamKey =
      this.reflector.get<string>(
        taskCommentIdMetadataKey,
        context.getClass(),
      ) || 'id';

    const taskCommentId = request.params[taskCommentIdParamKey];
    const { id: userId } = request.user;

    const taskComment = await this.taskCommentsRepository.findOneBy({
      id: taskCommentId,
      createdBy: { id: userId },
    });

    if (!taskComment) {
      throw new NotFoundException(
        `Task comment with id ${taskCommentId} not found`,
      );
    }

    return true;
  }
}
