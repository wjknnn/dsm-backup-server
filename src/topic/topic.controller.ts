import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { TopicService } from './topic.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Topic')
@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get('/all')
  getTopicList(@Query('limit') limit?: number) {
    return this.topicService.getTopicList(limit);
  }

  @Get(':id')
  getTopic(@Param('id', ParseIntPipe) id: number) {
    return this.topicService.getTopic(id);
  }
}
