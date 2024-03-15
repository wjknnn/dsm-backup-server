import { Injectable } from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { CreateUserDto } from './dto/create-user.dto';
import { Supa } from './entities/supa.entity';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'Supabase URL or key is missing in environment variables',
      );
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async getAllUsers() {
    const { data, error } = await this.supabase.from('supausers').select('*');

    if (error) {
      throw new Error('Failed to fetch users');
    }

    console.log('✨ sucess get all users.');

    return data;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { name, password, profileImage } = createUserDto;

    const timeZone = 'Asia/Seoul';
    const currentTime = new Date().toLocaleString('en-US', { timeZone });

    const { data, error } = await this.supabase.from('supausers').insert<Supa>({
      name: name,
      password: password,
      profile_image: profileImage || null,
      created_at: currentTime,
    });

    if (error) {
      throw new Error('Failed to create user');
    }

    return data;
  }
}
