import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { getCurrentTime } from '@/utils';

@Injectable()
export class FeedbackService {
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

  async getFeedbackList(
    page?: number,
    order?: 'latest' | 'less' | 'popular',
    limit?: number,
  ) {
    let query = this.supabase
      .from('feedback')
      .select(`*, users:writer(name, profile_image)`);

    console.log(`page is : ${page}, order is : ${order}, limit is : ${limit}`);

    if (order === 'latest')
      query = query.order('created_at', { ascending: false });
    else if (order === 'popular')
      query = query.order('feedback', { ascending: false });
    else if (order === 'less')
      query = query.order('feedback', { ascending: true });

    query = query.range(limit * (page - 1), limit * page).limit(limit);

    const { data, error } = await query;

    if (error) {
      throw new BadRequestException('Something wrong. maybe limit is wrong.');
    }

    return data;
  }

  async getFeedback(id: number) {
    const { data: feedbackData, error: feedbackError } = await this.supabase
      .from('feedback')
      .select(`*, users:writer(name, profile_image)`)
      .eq('id', id)
      .single();

    if (feedbackError) {
      throw new NotFoundException(`not found feedback id ${id}.`);
    }

    return feedbackData;
  }

  async postFeedback(createFeedbackDto: CreateFeedbackDto) {
    const { title, content, tags, writer } = createFeedbackDto;

    const currentTime = getCurrentTime();
  }
}
