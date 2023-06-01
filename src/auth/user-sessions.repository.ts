import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSessionEntity } from './user-session.entity';

@Injectable()
export class UserSessionsRepository extends Repository<UserSessionEntity> {
  constructor(
    @InjectRepository(UserSessionEntity)
    private userSessionsRepository: Repository<UserSessionEntity>,
  ) {
    super(
      userSessionsRepository.target,
      userSessionsRepository.manager,
      userSessionsRepository.queryRunner,
    );
  }

  async createSession(session: UserSessionEntity) {
    try {
      const sessionObj = this.userSessionsRepository.create(session);

      await this.userSessionsRepository.save(sessionObj);
    } catch (error) {
      throw new InternalServerErrorException('Error creating session');
    }
  }
}
