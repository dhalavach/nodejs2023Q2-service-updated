import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { dirname } from 'path';
import { parse } from 'yaml';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { Logger } from './log/logging-service';
import { HttpException, ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import { HttpExceptionFilter } from './exceptions/http-exception-filter';

config();
const port = Number(process.env.PORT) || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
    bodyParser: true,
    rawBody: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const api = await readFile(
    join(dirname(__dirname), 'doc', 'api.yaml'),
    'utf-8',
  );
  const doc: OpenAPIObject = parse(api);
  SwaggerModule.setup('doc', app, doc);
  await app.listen(port);
}
bootstrap();
