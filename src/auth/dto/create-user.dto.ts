import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmailAllowed } from './custom-email-validator';

export class CreateUserDto {
  @ApiProperty({
    description: '用户昵称',
    example: 'John Doe',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: '密码',
    example: 'abc123456',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: '邮箱',
    example: '123@qq.com',
    required: true,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @IsEmailAllowed({ message: '邮箱白名单验证不通过' })
  email: string;
}
