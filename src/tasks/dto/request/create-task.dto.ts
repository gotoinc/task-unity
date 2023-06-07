import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PriorityEnum } from '../../priority.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(PriorityEnum)
  priority: PriorityEnum;

  @IsArray()
  tags: string[];
}
