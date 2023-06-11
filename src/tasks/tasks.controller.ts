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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/request/create-task.dto';
import { GetUser } from '../auth/get-user.decorator';
import { UserEntity } from '../users/user.entity';
import { TaskEntity } from './task.entity';
import { UpdateTaskDto } from './dto/request/update-task.dto';
import { UpdateTaskStatusDto } from './dto/request/update-task-status.dto';
import { AssignTaskDto } from './dto/request/assign-task.dto';
import { TaskBelongingGuard } from './task-belonging.guard';
import { GetTasksResponseDto } from './dto/response/get-tasks-response.dto';
import { PaginationOptions } from '../common/decorators/pagination-options.decorator';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { GetTasksDto } from './dto/request/get-tasks.dto';

@UseGuards(AuthGuard(), TaskBelongingGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  async createTask(
    @Body() dto: CreateTaskDto,
    @GetUser() user: UserEntity,
  ): Promise<TaskEntity> {
    return this.tasksService.createTask(dto, user);
  }

  @Get()
  async getTasks(
    @GetUser() user: UserEntity,
    @PaginationOptions() options: IPaginationOptions,
    @Query() query: GetTasksDto,
  ): Promise<GetTasksResponseDto> {
    return this.tasksService.getTasks(user, query, options);
  }

  @Get(':id')
  async getTask(@Param('id') id: number): Promise<TaskEntity> {
    return this.tasksService.getTaskById(id);
  }

  @Patch(':id')
  async updateTask(
    @Body() dto: UpdateTaskDto,
    @Param('id') id: number,
  ): Promise<TaskEntity> {
    return this.tasksService.updateTask(dto, id);
  }

  @Patch(':id/status')
  async updateTaskStatus(
    @Body() dto: UpdateTaskStatusDto,
    @Param('id') id: number,
  ): Promise<TaskEntity> {
    return this.tasksService.updateTaskCompletion(dto, id);
  }

  @Patch(':id/assign')
  async assignTask(
    @Body() dto: AssignTaskDto,
    @Param('id') id: number,
  ): Promise<TaskEntity> {
    return this.tasksService.assignTask(dto, id);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}
