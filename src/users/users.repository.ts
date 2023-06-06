import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from '../auth/dto/request/sign-up.dto';
import { PostgresError } from 'pg-error-enum';
import * as argon2 from 'argon2';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {
    super(
      usersRepository.target,
      usersRepository.manager,
      usersRepository.queryRunner,
    );
  }

  async createUser(dto: SignUpDto): Promise<void> {
    const { password, email, username } = dto;

    const hashedPassword = await argon2.hash(password);

    const user = this.create({ password: hashedPassword, email, username });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === PostgresError.UNIQUE_VIOLATION) {
        throw new ConflictException(
          'User with such username or email already exists',
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
