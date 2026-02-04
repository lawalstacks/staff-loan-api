import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import morgan from 'morgan';
import helmet from 'helmet';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://staff-loan-ui.miiglu.app',
      'http://localhost:5173'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.use(helmet());
  app.use(morgan('dev'));

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strips non-DTO properties
    forbidNonWhitelisted: true, // Throws error on non-DTO properties
  }));

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
