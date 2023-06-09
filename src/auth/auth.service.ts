import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { SignUpDto } from './dto/request/sign-up.dto';
import argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { SignInDto } from './dto/request/sign-in.dto';
import { RefreshTokenPayload } from './refresh-token-payload.interface';
import crypto from 'crypto';
import { UserSessionsRepository } from './user-sessions.repository';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private userSessionsRepository: UserSessionsRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto) {
    return this.usersRepository.createUser(dto);
  }

  async logoutFromAllDevices(user: UserEntity) {
    await this.userSessionsRepository.deleteAllUserSessions(user.id);
  }

  async signIn(dto: SignInDto): Promise<{ accessToken: string }> {
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

      await this.userSessionsRepository.createSession({
        sessionId: uniqueId,
        refreshToken,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
        createdAt: new Date(),
        userId: user.id,
      });

      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async refresh(accessToken: string): Promise<{ accessToken: string }> {
    const { uniqueId, email, username }: JwtPayload = this.jwtService.decode(
      accessToken,
    ) as JwtPayload;

    const userSession = await this.userSessionsRepository.findOneBy({
      sessionId: uniqueId,
    });

    if (!userSession) {
      throw new UnauthorizedException('Invalid session');
    }

    if (userSession.expiresAt < new Date()) {
      throw new UnauthorizedException('Session expired');
    }

    const jwtPayload: JwtPayload = {
      email,
      username,
      uniqueId,
    };

    const newAccessToken = await this.generateJwt(jwtPayload);

    return {
      accessToken: newAccessToken,
    };
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
    const expiryTime = process.env.NODE_ENV === 'development' ? '1h' : '7d';
    return this.generateToken(jwtPayload, expiryTime);
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
