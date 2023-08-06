import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class Logger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log(message);
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(message);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(message);
  }
}
