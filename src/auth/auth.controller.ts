import { Body, Controller, Post, Req } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { ExtractJwt } from 'passport-jwt';

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

  @Post('/refresh')
  async refresh(@Req() request): Promise<{ accessToken: string }> {
    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    return this.authService.refresh(accessToken);
  }
}
