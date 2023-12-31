import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { UserEntity } from '../users/user.entity';
import { CreateTaskCommentDto } from './dto/request/create-task-comment.dto';
import { TaskCommentsService } from './task-comments.service';
import { TaskCommentEntity } from './task-comment.entity';
import { UpdateTaskCommentDto } from './dto/request/update-task-comment.dto';
import { TaskBelongingGuard } from '../tasks/task-belonging.guard';
import { TaskCommentBelongingGuard } from './task-comment-belonging.guard';
import { TaskIdParamKey } from '../tasks/task-id-param-key.decorator';
import { GetTaskCommentsResponseDto } from './dto/response/get-task-comments-response.dto';
import { PaginationOptions } from '../common/decorators/pagination-options.decorator';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { GetTaskCommentsDto } from './dto/request/get-task-comments.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('task-comments')
@ApiBearerAuth()
@TaskIdParamKey('taskId')
@UseGuards(AuthGuard(), TaskBelongingGuard)
@Controller('task/:taskId/comments')
export class TaskCommentsController {
  constructor(private taskCommentsService: TaskCommentsService) {}

  @Post()
  async createTaskComment(
    @Body() dto: CreateTaskCommentDto,
    @GetUser() user: UserEntity,
    @Param('taskId') taskId: number,
  ): Promise<TaskCommentEntity> {
    return this.taskCommentsService.createTaskComment(dto, taskId, user);
  }

  @Get()
  async getTaskComments(
    @Param('taskId') taskId: number,
    @PaginationOptions() options: IPaginationOptions,
    @Query() dto: GetTaskCommentsDto,
  ): Promise<GetTaskCommentsResponseDto> {
    debugger;
    return this.taskCommentsService.getTaskComments(taskId, dto, options);
  }

  @UseGuards(TaskCommentBelongingGuard)
  @Patch(':id')
  async updateTaskComment(
    @Body() dto: UpdateTaskCommentDto,
    @Param('id') taskCommentId: number,
  ): Promise<TaskCommentEntity> {
    return this.taskCommentsService.updateTaskComment(taskCommentId, dto);
  }

  @UseGuards(TaskCommentBelongingGuard)
  @Delete(':id')
  async deleteTaskComment(@Param('id') id: number): Promise<void> {
    return this.taskCommentsService.deleteTaskComment(id);
  }
}
