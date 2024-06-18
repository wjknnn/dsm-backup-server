import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { findFirstImageLink, getCurrentTime, stripMarkdown } from '../utils';
import { Feedback } from './entities/feedback.entity';

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

  async getPopularFeedbackList() {
    const { data, error } = await this.supabase
      .from('feedback')
      .select('*')
      .order('views', { ascending: false })
      .limit(20);

    if (error) {
      throw new BadRequestException(`can not get a popular feedback list.`);
    }

    return data;
  }

  async getFeedback(id: number) {
    const { data: feedbackData, error: feedbackError } = await this.supabase
      .from('feedback')
      .select(`*, users:writer(name, profile_image), feedback_comment(count)`)
      .eq('id', id)
      .single();

    if (feedbackError) {
      throw new NotFoundException(`not found feedback id ${id}.`);
    }

    const updatedViews = feedbackData.views + 1;

    const { error: viewsError } = await this.supabase
      .from('feedback')
      .update({ views: updatedViews })
      .eq('id', id);

    if (viewsError) {
      throw new BadRequestException(`can not update view count.`);
    }

    return {
      ...feedbackData,
      views: updatedViews,
      feedback_comment: feedbackData.feedback_comment[0].count,
    };
  }

  async getFeedbackComment(id: number) {
    const { data, error } = await this.supabase
      .from('feedback_comment')
      .select('*, users:writer(name)')
      .eq('feedback', id)
      .order('created_at', { ascending: false });

    if (error) {
      throw new BadRequestException(`can not get feedback ${id} comment.`);
    }

    return data;
  }

  async getFeedbackAnswer(id: number) {
    const { data, error } = await this.supabase
      .from('feedback_answer')
      .select('*, users:writer(name, profile_image), feedback_comment(count)')
      .eq('feedback', id)
      .order('like', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      throw new BadRequestException(`can not get feedback ${id} answer.`);
    }

    return data;
  }

  async postFeedback(createFeedbackDto: CreateFeedbackDto, writer: string) {
    const { title, content, tags } = createFeedbackDto;

    const explanation = stripMarkdown(content);
    const image = findFirstImageLink(content);
    const currentTime = getCurrentTime();

    const { error } = await this.supabase.from('feedback').insert<Feedback>({
      title: title,
      explanation: explanation,
      image: image,
      content: content,
      tags: tags,
      writer: writer,
      created_at: currentTime,
    });

    if (error) {
      console.log(error);
      throw new BadRequestException('Failed to upload feedback.');
    }
  }

  async deleteFeedback(id: string, writer: string) {
    console.log('delete!!');
    const { error } = await this.supabase
      .from('feedback')
      .delete()
      .eq('id', id)
      .eq('writer', writer);

    if (error) {
      throw new BadRequestException('Feedback id or writer is wrong.');
    }
  }
}
