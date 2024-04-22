import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService, UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth.guard';
import { User } from './entities/user.entity';

@ApiTags('User')
@UseGuards(AuthGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.getUserData(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }
}

@ApiTags('User')
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.authService.deleteUser(id);
  }
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Post('signup')
  @ApiOperation({
    summary: '회원가입',
    description: '유저의 정보를 받아 회원가입해요.',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: '유저의 정보를 받아 회원가입해요.',
    type: User,
  })
  async signupUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.signupUser(createUserDto);
  }
}
