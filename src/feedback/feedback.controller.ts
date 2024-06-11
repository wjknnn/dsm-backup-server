import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth.guard';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get('/all')
  getFeedbackList(
    @Query('page') page?: number,
    @Query('order') order?: 'latest' | 'less' | 'popular',
    @Query('limit') limit?: number,
  ) {
    return this.feedbackService.getFeedbackList(page, order, limit || 10);
  }

  @Get('/popular')
  getPopularFeedbackList() {
    return this.feedbackService.getPopularFeedbackList();
  }

  @Get(':id')
  getFeedback(@Param('id', ParseIntPipe) id: number) {
    return this.feedbackService.getFeedback(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async uploadFeedback(
    @Body() createFeedbackDto: CreateFeedbackDto,
    @Request() req,
  ) {
    const writer = req.user.sub;
    return this.feedbackService.postFeedback(createFeedbackDto, writer);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteFeedback(@Param('id') id: string, @Request() req) {
    return await this.feedbackService.deleteFeedback(id, req.user.sub);
  }
}
