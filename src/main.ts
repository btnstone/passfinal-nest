import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptor/response.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// 引入 useContainer 方法
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 告诉 class-validator 使用 NestJS 的依赖注入容器
  // 这允许你的自定义类验证器能够注入服务，如 ConfigService
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle('Passfinal API Example')
    .setDescription('The example API description')
    .setVersion('1.0')
    .addTag('example')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalInterceptors(new TransformInterceptor());

  // 全局使用 ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      // 你可以在这里添加其他 ValidationPipe 的选项
    }),
  );

  await app.listen(3000);
}
bootstrap();
