import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/get-user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('users')
export class UsersController {
  @Get('/me')
  getCurrentUser(@GetUser() user: UserEntity): UserEntity {
    return user;
  }
}
