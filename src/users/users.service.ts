import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable()
export class UsersService {
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

  async signupUser(createUserDto: CreateUserDto) {
    const { name, school, profileImage } = createUserDto;

    const timeZone = 'Asia/Seoul';
    const currentTime = new Date().toLocaleString('en-US', { timeZone });

    const { data, error } = await this.supabase.from('users').insert<User>({
      name: name,
      school: school || null,
      profile_image: profileImage || null,
      created_at: currentTime,
    });

    if (error) {
      throw new Error('Failed to signup');
    }

    return data;
  }

  async getUserData(id: string) {
    console.log('called!');
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new NotFoundException(`User with ID '${id}' not found.`);
    return data;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   const found = this.findOne(id);
  //   this.remove(id);
  //   this.users.push({ ...found, ...updateUserDto, updatedAt: new Date() });
  // }

  // remove(id: number) {
  //   this.findOne(id);
  //   this.users = this.users.filter((u) => u.id !== id);
  // }
}
