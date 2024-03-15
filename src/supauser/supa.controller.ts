import { Body, Controller, Get, Post } from '@nestjs/common';
import { SupabaseService } from './supa.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('test')
@Controller('supa')
export class SupaUsersController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @ApiOperation({ summary: '모든 사용자의 정보를 가져와요.' })
  @Get()
  async findAllUsers() {
    return await this.supabaseService.getAllUsers();
  }

  @ApiOperation({ summary: '사용자를 생성해요.' })
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.supabaseService.createUser(createUserDto);
  }
}
