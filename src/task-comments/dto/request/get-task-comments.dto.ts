import { SortingDto } from '../../../common/dto/request/sorting.dto';
import { TaskCommentEntity } from '../../task-comment.entity';
import { IsIn } from 'class-validator';

export class GetTaskCommentsDto extends SortingDto<TaskCommentEntity> {
  @IsIn(['id', 'createdAt', 'updatedAt'])
  sort: keyof TaskCommentEntity;
}
