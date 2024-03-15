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
      synchronize: process.env.ISDEV === 'develop' ? true : false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UsersModule,
    SupaUsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
