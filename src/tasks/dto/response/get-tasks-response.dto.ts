import { TaskEntity } from '../../task.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

export class GetTasksResponseDto extends Pagination<TaskEntity> {}
