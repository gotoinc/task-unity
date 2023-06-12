import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSessionEntity } from './user-session.entity';
import { UserSessionsRepository } from './user-sessions.repository';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_TIME'),
        },
      }),
    }),
    TypeOrmModule.forFeature([UserSessionEntity]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: 'JWT_SECRET_KEY',
      useFactory: async (configService: ConfigService) => {
        return configService.get<string>('JWT_SECRET_KEY');
      },
      inject: [ConfigService],
    },
    UserSessionsRepository,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
