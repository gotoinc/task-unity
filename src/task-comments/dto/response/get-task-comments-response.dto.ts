import { Pagination } from 'nestjs-typeorm-paginate';
import { TaskCommentEntity } from '../../task-comment.entity';

export class GetTaskCommentsResponseDto extends Pagination<TaskCommentEntity> {}
