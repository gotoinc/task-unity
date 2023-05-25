import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from '../users/users.repository';
import { JwtPayload } from './jwt-payload.interface';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersRepository: UsersRepository,
    @Inject('JWT_SECRET_KEY') private readonly jwtSecretKey: string,
  ) {
    super({
      secretOrKey: jwtSecretKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const { email } = payload;

    const user: UserEntity = await this.usersRepository.findOneBy({
      email,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
