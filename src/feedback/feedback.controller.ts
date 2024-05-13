import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get('/all')
  getFeedbackList(
    @Query('page') page?: number,
    @Query('order') order?: 'latest' | 'less' | 'popular',
  ) {
    return this.feedbackService.getFeedbackList(page, order);
  }

  @Get(':id')
  getFeedback(@Param('id', ParseIntPipe) id: number) {
    return this.feedbackService.getFeedback(id);
  }
}
