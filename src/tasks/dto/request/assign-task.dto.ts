import { IsNumber, IsOptional } from 'class-validator';

export class AssignTaskDto {
  @IsNumber()
  @IsOptional()
  userId?: number;
}
