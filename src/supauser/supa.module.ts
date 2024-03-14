import { Module } from '@nestjs/common';
import { SupabaseService } from './supa.service';
import { SupaUsersController } from './supa.controller';

@Module({
  controllers: [SupaUsersController],
  providers: [SupabaseService],
})
export class SupaUsersModule {}
