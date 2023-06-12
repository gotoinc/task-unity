import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { SignUpDto } from './dto/request/sign-up.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/request/sign-in.dto';
import { ExtractJwt } from 'passport-jwt';
import { GetUser } from './get-user.decorator';
import { UserEntity } from '../users/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post('/sign-in')
  async signIn(@Body() dto: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('/refresh')
  async refresh(@Req() request): Promise<{ accessToken: string }> {
    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    return this.authService.refresh(accessToken);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('/logout-all-devices')
  async logoutFromAllDevices(@GetUser() user: UserEntity) {
    return this.authService.logoutFromAllDevices(user);
  }
}
