import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { getCurrentTime } from '../utils';
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

  async postFeedback(createFeedbackDto: CreateFeedbackDto, writer: string) {
    function stripMarkdown(markdown: string) {
      return (
        markdown
          // 헤더 제거
          .replace(/^\s{0,3}(#{1,6})\s+(.*)/gm, '$2')
          // 리스트 항목 제거
          .replace(/^\s*[-*+]\s+/gm, '')
          .replace(/^\s*\d+\.\s+/gm, '')
          // 인라인 코드 제거
          .replace(/`([^`]+)`/g, '$1')
          // 블록 코드 제거
          .replace(/```[\s\S]*?```/g, '')
          // 인용 블록 제거
          .replace(/^\s*>+\s+/gm, '')
          // 링크와 이미지 제거
          .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '$1')
          .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
          // 강조 제거 (굵게, 기울임)
          .replace(/(\*{1,3})([^*]+)\1/g, '$2')
          .replace(/(_{1,3})([^_]+)\1/g, '$2')
          // 취소선 제거
          .replace(/~~([^~]+)~~/g, '$1')
          // 수평선 제거
          .replace(/^\s*([-*_]){3,}\s*$/gm, '')
          // HTML 태그 제거
          .replace(/<[^>]+>/g, '')
          // 한 줄의 맨 앞에 있는 ^ 제거
          .replace(/^\^+/gm, '')
          // 남아있는 잉여 공백 제거
          .replace(/^\s+|\s+$/g, '')
          .replace(/\s+/g, ' ')
      );
    }

    function findFirstImageLink(markdown: string) {
      const imageRegex = /!\[.*?\]\((.*?)\)/;
      const match = markdown.match(imageRegex);

      if (match && match[1]) {
        const imageUrl = match[1];
        if (imageUrl.startsWith('https://')) {
          return imageUrl;
        }
      }
      return null;
    }

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
}
