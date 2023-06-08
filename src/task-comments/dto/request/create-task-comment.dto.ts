import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}
