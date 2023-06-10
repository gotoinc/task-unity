import { IsOptional } from 'class-validator';
import { CommonEntity } from '../../entities/common.entity';

export class SortingDto<T extends CommonEntity> {
  @IsOptional()
  sort: keyof T = 'createdAt';

  @IsOptional()
  order: 'DESC' | 'ASC' = 'DESC';
}
