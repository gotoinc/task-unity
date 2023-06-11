import {
  createParamDecorator,
  DefaultValuePipe,
  ExecutionContext,
} from '@nestjs/common';

export const PaginationOptions = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { page, limit } = request.query;

    return {
      page: new DefaultValuePipe(1).transform(page),
      limit: new DefaultValuePipe(10).transform(limit),
    };
  },
);
