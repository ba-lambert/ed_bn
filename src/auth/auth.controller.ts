import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard, AuthenticatedGuard } from './passport/Auth.guard';
import { RolesGuard } from './passport/roles.guard';
import { Roles } from './passport/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto:CreateAuthDto) {
    return this.authService.create(createAuthDto.username,createAuthDto.password,createAuthDto.roles);
  }

  @UseGuards(AuthGuard)
  @Post('/signin')
  async login(@Body() createAuthDto: CreateAuthDto, @Req() req, @Res() res) {
    const user = await this.authService.validateUser(createAuthDto.username, createAuthDto.password);
    if (user) {
      req.session.user = user;
      return res.send('Login successful');
    } else {
      return res.send('Invalid credentials');
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.authService.findAll();
  }
  @Get('me')
  @UseGuards(AuthenticatedGuard)
  me(@Request() req) {

    return req.user
  }
  @UseGuards(AuthGuard,RolesGuard)
  @Roles('admin')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
