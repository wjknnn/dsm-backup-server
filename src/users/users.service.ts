import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/user.entity';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { getCurrentTime } from '../utils';

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
    const { id, name, grade, profileImage } = createUserDto;

    const currentTime = getCurrentTime(true);

    const { data, error } = await this.supabase.from('users').insert<Users>({
      id: id,
      name: name,
      school_grade: grade || null,
      profile_image: profileImage || null,
      created_at: currentTime,
      updated_at: currentTime,
    });

    if (error) {
      throw new BadRequestException(
        'Failed to signup. maybe userId was wrong.',
      );
    }

    return data;
  }

  async getUserData(id: string) {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new NotFoundException(`User with ID '${id}' not found.`);
    return data;
  }
}

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SERVICE_ROLE;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'Supabase URL or key is missing in environment variables',
      );
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async deleteUser(id: string) {
    const { error: userError } = await this.supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (userError) {
      console.log(userError);
      throw new BadRequestException('user id is not valid.');
    }

    const { error: authUserError } =
      await this.supabase.auth.admin.deleteUser(id);

    if (authUserError) {
      console.log(authUserError);
      throw new BadRequestException('user id is not valid.');
    }
  }
}
