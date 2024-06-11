import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './confing';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {

  const logger = new Logger('Main-Getaway');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes( 
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.useGlobalFilters(new RpcCustomExceptionFilter())
  
  await app.listen(envs.port);

  logger.log(`Getaway running on port ${envs.port}`);


}
bootstrap();
