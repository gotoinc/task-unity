import { SetMetadata } from '@nestjs/common';

export const taskCommentIdMetadataKey = 'taskCommentIdMetadataKey';

export const TaskCommentIdParamKey = (key: string) => {
  SetMetadata(taskCommentIdMetadataKey, key);
};
