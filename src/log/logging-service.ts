import { Injectable, LoggerService } from '@nestjs/common';
import { appendFile, readdir, stat } from 'fs/promises';
import { resolve } from 'path';
import {} from 'dotenv/config';

@Injectable()
export class Logger implements LoggerService {
  constructor() {
    this.logFileIndex = 1;
    this.errorLogFileIndex = 1;
    this.warningLogFileIndex = 1;
    this.maxLogFileSize = 1024 * 1024;
  }
  logFileIndex: number;
  errorLogFileIndex: number;
  warningLogFileIndex: number;
  maxLogFileSize: number;

  async log(message: any, ...optionalParams: any[]) {
    let pathToLog = resolve(
      process.cwd(),
      `homelib-log_${this.logFileIndex}.txt`,
    );
    try {
      const stats = await stat(pathToLog);
      const size = stats.size;
      if (size > this.maxLogFileSize) {
        this.logFileIndex++;
        pathToLog = resolve(
          process.cwd(),
          `homelib-log_${this.logFileIndex}.txt`,
        );
      }
    } catch (err) {
      console.log(err);
    }

    console.log(message);
    try {
      await appendFile(pathToLog, `${message}\n`, 'utf-8');
    } catch (err) {
      console.log(err);
    }
  }

  async error(message: any, ...optionalParams: any[]) {
    let pathToErrorLog = resolve(
      process.cwd(),
      `homelib-log-error_${this.errorLogFileIndex}.txt`,
    );
    try {
      const stats = await stat(pathToErrorLog);
      const size = stats.size;
      if (size > this.maxLogFileSize) {
        this.errorLogFileIndex++;
        pathToErrorLog = resolve(
          process.cwd(),
          `homelib-log-error_${this.errorLogFileIndex}.txt`,
        );
      }
    } catch (err) {
      console.log(err);
    }

    console.log(message);
    try {
      await appendFile(pathToErrorLog, `${message}\n`, 'utf-8');
    } catch (err) {
      console.log(err);
    }
  }

  async warn(message: any, ...optionalParams: any[]) {
    let pathToWarningLog = resolve(
      process.cwd(),
      `homelib-log-warning_${this.warningLogFileIndex}.txt`,
    );
    try {
      const stats = await stat(pathToWarningLog);
      const size = stats.size;
      if (size > this.maxLogFileSize) {
        this.warningLogFileIndex++;
        pathToWarningLog = resolve(
          process.cwd(),
          `homelib-log-warning_${this.warningLogFileIndex}.txt`,
        );
      }
    } catch (err) {
      console.log(err);
    }

    console.log(message);
    try {
      await appendFile(pathToWarningLog, `${message}\n`, 'utf-8');
    } catch (err) {
      console.log(err);
    }
  }
}
