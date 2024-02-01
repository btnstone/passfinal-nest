import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    // 尝试一下获取可信邮箱列表
    // const allowedDomains = this.configService.get<string[]>(
    //   'email.allowedDomains',
    // );
    // console.log(allowedDomains);
    // 检查用户名是否已存在
    const existingUsername = await this.prisma.user.findUnique({
      where: { username: userData.username },
    });
    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }

    // 检查邮箱是否已存在
    const existingEmail = await this.prisma.user.findUnique({
      where: { email: userData.email },
    });
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    // 创建新用户
    return this.prisma.user.create({ data: userData });
  }
}
