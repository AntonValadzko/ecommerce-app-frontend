import winston from 'winston';
import { getServerEnv } from './env';

const { LOG_LEVEL, isDev } = getServerEnv();

export const logger = winston.createLogger({
  level: LOG_LEVEL,
  defaultMeta: { service: 'product-catalog-frontend' },
  transports: [
    new winston.transports.Console({
      format: isDev
        ? winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: 'HH:mm:ss' }),
            winston.format.printf(({ timestamp, level, message, service, ...meta }) => {
              const extra = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
              return `${timestamp} [${service}] ${level}: ${message}${extra}`;
            })
          )
        : winston.format.combine(winston.format.timestamp(), winston.format.json()),
    }),
  ],
});
