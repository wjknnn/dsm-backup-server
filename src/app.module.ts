import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupaUsersModule } from './supauser/supa.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.SUPABASE_HOST,
      port: 5432,
      username: process.env.SUPABASE_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: 'postgres',
      synchronize: true, // 이 옵션은 개발 시에만 사용하며, 프로덕션 환경에서는 사용하지 않는 것이 좋습니다.
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UsersModule,
    SupaUsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
