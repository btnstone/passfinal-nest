import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { IsEmailAllowedConstraint } from './dto/custom-email-validator';

@Module({
  controllers: [AuthController],
  providers: [AuthService, IsEmailAllowedConstraint],
})
export class AuthModule {}
