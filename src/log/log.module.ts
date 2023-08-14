import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { Logger } from './logging-service';

@Module({
  controllers: [LogController],
  providers: [Logger],
  exports: [Logger],
})
export class LogModule {}
