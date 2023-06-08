import { Module } from '@nestjs/common';
import { TaskCommentsController } from './task-comments.controller';
import { TaskCommentsService } from './task-comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskCommentEntity } from './task-comment.entity';
import { TasksModule } from '../tasks/tasks.module';
import { AuthModule } from '../auth/auth.module';
import { TaskCommentsRepository } from './task-comments.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskCommentEntity]),
    TasksModule,
    AuthModule,
  ],
  controllers: [TaskCommentsController],
  providers: [TaskCommentsService, TaskCommentsRepository],
})
export class TaskCommentsModule {}
