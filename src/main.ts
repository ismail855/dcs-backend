// src/main.ts

import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.map(
          (error) =>
            `${error.property} has wrong value ${error.value}, ${Object.values(error.constraints!).join(', ')}`,
        );
        return new BadRequestException(messages);
      },
    }),
  );

  // CORS Configuration
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  app.enableCors({
    origin: frontendUrl, // Replace with your frontend's origin
    credentials: true, // Allow credentials (cookies, auth headers)
  });

  await app.listen(process.env.PORT ?? 3000); // Ensure this matches backend's port
}
bootstrap();
