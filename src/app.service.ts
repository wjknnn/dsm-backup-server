import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello() {
    const host = this.configService.get<string>('HOST');
    const port = this.configService.get<number>('PORT', 8080);
    return {
      host,
      port,
    };
  }
}
