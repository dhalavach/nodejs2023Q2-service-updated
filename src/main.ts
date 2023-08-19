import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { dirname } from 'path';
// import { parse } from 'yaml';
import { load } from 'js-yaml';

import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { Logger } from './log/logging-service';
import { HttpException, ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import { HttpExceptionFilter } from './exceptions/http-exception-filter';
import { serve, setup } from 'swagger-ui-express';

config();
const port = Number(process.env.PORT) || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
    bodyParser: true,
    rawBody: true,
  });
  app.useGlobalFilters(new HttpExceptionFilter());

  const doc = load(
    (
      await readFile(join(dirname(__dirname), 'doc', 'api.yaml'), 'utf-8')
    ).toString(),
  );
  app.use('/doc', serve, setup(doc));
  await app.listen(port);
}
bootstrap();
