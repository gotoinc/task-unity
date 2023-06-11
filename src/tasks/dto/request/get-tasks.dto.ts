import { SortingDto } from '../../../common/dto/request/sorting.dto';
import { TaskEntity } from '../../task.entity';

export class GetTasksDto extends SortingDto<TaskEntity> {}
