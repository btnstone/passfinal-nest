import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({
    description: '用户相关',
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: '用户昵称',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: '密码',
    example: 'abc123456',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: '头像',
    example: 'avatar.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/\.jpg$/, { message: 'avatar must be a .jpg file' })
  avatar?: string;
}
