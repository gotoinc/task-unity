import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { SignUpDto } from './dto/sign-up.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto) {
    return this.usersRepository.createUser(dto);
  }

  async signIn(dto: SignInDto): Promise<{ accessToken: string }> {
    const { email, password } = dto;
    const user = await this.usersRepository.findOneBy({ email });

    const isPasswordValid = await argon2.verify(user.password, password);

    if (user && isPasswordValid) {
      const payload: JwtPayload = { email, username: user.username };
      const accessToken = await this.jwtService.signAsync(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
