import { Controller, Get } from '@nestjs/common';
import { SupabaseService } from './supa.service';

@Controller('supa')
export class SupaUsersController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Get()
  async findAllUsers() {
    const { data, error } = await this.supabaseService.getAllUsers();

    if (error) {
      throw new Error('Failed to fetch users');
    }

    return data;
  }
}
