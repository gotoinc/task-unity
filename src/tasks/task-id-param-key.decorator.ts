import { SetMetadata } from '@nestjs/common';

export const taskIdMetadataKey = 'taskIdParamKey';

export const TaskIdParamKey = (key: string) => {
  return SetMetadata(taskIdMetadataKey, key);
};
