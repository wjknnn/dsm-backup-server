import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable()
export class TopicService {
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

  async getTopicList(page?: number, limit?: number) {
    let query = this.supabase
      .from('topic')
      .select('*')
      .order('created_at', { ascending: false });

    query = query.range(limit * (page - 1), limit * page).limit(limit);

    const { data, error } = await query;

    if (error) {
      throw new BadRequestException('Something wrong. maybe limit is wrong.');
    }

    return data;
  }

  async getTopic(id: number) {
    const { data: topicData, error: topicError } = await this.supabase
      .from('topic')
      .select('*')
      .eq('id', id);

    const { data: topicComment, error: commentError } = await this.supabase
      .from('topic_comment')
      .select('*, user(id, name, profile_image)')
      .eq('topic', id)
      .order('created_at', { ascending: false });

    if (topicError) throw new NotFoundException(`not found topic id ${id}.`);
    if (commentError) {
      throw new NotFoundException(`not found topic comment id ${id}.`);
    }

    const mainComment = topicComment.filter((value) => !value.recomment);

    const resultComment = mainComment.map((value) => {
      const make = topicComment.filter((main) => main.recomment === value.id);
      return {
        ...value,
        recommentInfo: make.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        ),
      };
    });

    const topicDetail = {
      ...topicData[0],
      comment: resultComment,
      commentCount: topicComment.length,
    };

    return topicDetail;
  }
}
