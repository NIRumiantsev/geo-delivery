import { Controller, Post, HttpCode, Body, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthDto } from './dto';
import { AuthService } from "./auth.service";
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() { login, password }: AuthDto) {
    const validation = await this.userService.validateUser(login, password);
    return this.authService.login(validation.login);
  }
}
