import { IsIn, IsOptional, IsString } from 'class-validator';
import { CommonEntity } from '../../entities/common.entity';

export abstract class SortingDto<T extends CommonEntity> {
  @IsOptional()
  @IsString()
  @IsIn(['createdAt', 'updatedAt'])
  sort: keyof T = 'createdAt';

  @IsOptional()
  @IsString()
  @IsIn(['DESC', 'ASC'])
  order: 'DESC' | 'ASC' = 'DESC';
}
