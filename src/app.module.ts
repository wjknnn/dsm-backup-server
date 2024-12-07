import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { FeedbackModule, TopicModule, UsersModule } from './module.export';

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
      synchronize: process.env.ISDEV === 'develop' ? true : false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
    UsersModule,
    TopicModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
