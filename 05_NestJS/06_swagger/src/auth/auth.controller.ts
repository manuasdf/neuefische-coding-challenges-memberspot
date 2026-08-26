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
import { ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
) {}

  @UseGuards(AuthGuard("local"))
  @Post("login")
  @ApiOperation({ summary: 'Login an existing user' })
  @ApiOkResponse({ description: 'Returns a valid JWT token' })
  async login(@Request() req: any, @Body() _loginDto: LoginDto) {
    return this.authService.login(req.user);
  }

  @Post("register")
  @ApiOperation({ summary: 'Registers a new user' })
  @ApiOkResponse({ description: 'Returns the user object' })
  async register(@Request() req: any, @Body() _registerDto: RegisterDto) {
    return this.usersService.create(req);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("me")
  @ApiOperation({ summary: 'Get own user info' })
  @ApiOkResponse({ description: 'Returns the user object of the logged-in user' })
  @ApiUnauthorizedResponse({ description: 'No valid JWT token provided' })
  async me(@Request() req: any) {
    return this.usersService.findMe(req.user.id);
  }
}