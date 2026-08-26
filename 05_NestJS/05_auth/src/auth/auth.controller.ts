import { 
    Body, 
    Request, 
    Controller, 
    Post, 
    Get, 
    UseGuards 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import { UsersService } from '../users/users.service';

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
) {}

  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Request() req: any, @Body() _loginDto: LoginDto) {
    return this.authService.login(req.user);
  }

  @Post("register")
  async register(@Request() req: any, @Body() _registerDto: RegisterDto) {
    return this.usersService.create(req);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("me")
  async me(@Request() req: any) {
    return this.usersService.findMe(req.user.id);
  }
}