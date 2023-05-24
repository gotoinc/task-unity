import {
  Body,
  Get,
  Injectable,
  Post,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  createUser(@Body() createUserDto: CreateUserDto) {
    return 'placeholder for create user'
  }

  getCurrentUser() {

  }
}
