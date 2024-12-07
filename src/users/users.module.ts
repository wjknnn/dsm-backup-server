import { Module } from '@nestjs/common';
import { AuthService, UsersService } from './users.service';
import {
  AuthController,
  UserController,
  UsersController,
} from './users.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [UsersController, UserController, AuthController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
