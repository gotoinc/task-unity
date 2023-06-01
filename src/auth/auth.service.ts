import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { SignUpDto } from './dto/sign-up.dto';
import argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { SignInDto } from './dto/sign-in.dto';
import { RefreshTokenPayload } from './refresh-token-payload.interface';
import crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto) {
    return this.usersRepository.createUser(dto);
  }

  async signIn(
    dto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = dto;
    const user = await this.usersRepository.findOneBy({ email });

    const isPasswordValid = await argon2.verify(user.password, password);

    if (user && isPasswordValid) {
      const uniqueId = crypto.randomUUID();

      const jwtPayload: JwtPayload = {
        email,
        username: user.username,
        uniqueId,
      };
      const refreshPayload: RefreshTokenPayload = { ...jwtPayload };

      const { accessToken, refreshToken } = await this.generateTokens(
        jwtPayload,
        refreshPayload,
      );

      return { accessToken, refreshToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  private async generateTokens(
    jwtPayload: JwtPayload,
    refreshPayload: RefreshTokenPayload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.generateJwt(jwtPayload);
    const refreshToken = await this.generateToken(refreshPayload, '7d');

    return {
      accessToken,
      refreshToken,
    };
  }

  private async generateJwt(jwtPayload: JwtPayload): Promise<string> {
    return this.generateToken(jwtPayload, '1h');
  }

  private async generateToken(
    tokenPayload: JwtPayload | RefreshTokenPayload,
    expiresIn = '1h',
  ): Promise<string> {
    const token = await this.jwtService.signAsync(tokenPayload, {
      expiresIn,
    });

    return token;
  }
}
