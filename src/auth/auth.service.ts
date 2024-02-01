import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: userData,
    });
  }
}
