import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post('/sign-in')
  async signIn(
    @Body() dto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.signIn(dto);
  }

  @Post('/refresh')
  async refresh() {
    return this.authService.refresh();
  }
}
